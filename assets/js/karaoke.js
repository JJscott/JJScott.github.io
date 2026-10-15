(function () {
    // ---------- CSV parser (RFC 4180: quotes, embedded commas/newlines, BOM) ----------
    function parseCSV(text) {
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
        var rows = [], row = [], field = "", inQ = false;
        for (var i = 0; i < text.length; i++) {
            var c = text[i];
            if (inQ) {
                if (c === '"') {
                    if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false;
                } else field += c;
            } else if (c === '"') inQ = true;
            else if (c === ",") { row.push(field); field = ""; }
            else if (c === "\n" || c === "\r") {
                if (c === "\r" && text[i + 1] === "\n") i++;
                row.push(field); field = "";
                if (row.length > 1 || row[0] !== "") rows.push(row);
                row = [];
            } else field += c;
        }
        if (field !== "" || row.length) { row.push(field); rows.push(row); }
        return rows;
    }

    // ---------- Normalisation (CJK-safe) ----------
    function norm(s) {
        s = s.normalize("NFKC")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .normalize("NFC")
            .toLowerCase();
        return s.replace(/[\u30a1-\u30f6]/g, function (c) {
            return String.fromCharCode(c.charCodeAt(0) - 0x60);
        });
    }

    // ---------- Highlighting (only when normalisation preserved string length) ----------
    function setText(el, text, terms) {
        var n = norm(text);
        if (!terms.length || n.length !== text.length) { el.textContent = text; return; }
        var ranges = [];
        terms.forEach(function (t) {
            var i = n.indexOf(t);
            while (i !== -1) { ranges.push([i, i + t.length]); i = n.indexOf(t, i + t.length); }
        });
        if (!ranges.length) { el.textContent = text; return; }
        ranges.sort(function (a, b) { return a[0] - b[0]; });
        var merged = [ranges[0]];
        for (var k = 1; k < ranges.length; k++) {
            var last = merged[merged.length - 1];
            if (ranges[k][0] <= last[1]) last[1] = Math.max(last[1], ranges[k][1]);
            else merged.push(ranges[k]);
        }
        var frag = document.createDocumentFragment(), pos = 0;
        merged.forEach(function (r) {
            if (r[0] > pos) frag.appendChild(document.createTextNode(text.slice(pos, r[0])));
            var m = document.createElement("mark");
            m.textContent = text.slice(r[0], r[1]);
            frag.appendChild(m);
            pos = r[1];
        });
        if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
        el.appendChild(frag);
    }

    // ---------- Row building from <template> ----------
    function buildRow(tpl, song, terms) {
        var row = tpl.content.firstElementChild.cloneNode(true);

        // Remove optional blocks whose field is empty
        row.querySelectorAll("[data-part]").forEach(function (part) {
            if (!song[part.dataset.part]) part.remove();
        });
        var meta = row.querySelector(".ks-meta");
        if (meta && !meta.querySelector("[data-part]")) meta.remove();

        // Fill remaining fields
        row.querySelectorAll("[data-field]").forEach(function (el) {
            setText(el, song[el.dataset.field] || "", terms);
        });
        return row;
    }

    function init(root) {
        var input = root.querySelector(".ks-input");
        var status = root.querySelector(".ks-status");
        var out = root.querySelector(".ks-results");
        var headTpl = root.querySelector(".ks-tpl-head");
        var rowTpl = root.querySelector(".ks-tpl-row");
        var max = parseInt(root.dataset.max, 10) || 100;
        var songs = [];

        function idleMessage() {
            status.textContent = songs.length.toLocaleString() + " songs. Start typing to search.";
        }

        fetch(root.dataset.src)
            .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
            .then(function (text) {
                var rows = parseCSV(text);
                var header = (rows.shift() || []).map(function (h) { return h.trim().toLowerCase(); });
                var col = function (name) { return header.indexOf(name); };
                var idx = {
                    number: col("song_number"), title: col("title"), singer: col("singer"),
                    lyricist: col("lyricist"), composer: col("composer"), extra: col("extra")
                };
                songs = rows.map(function (r) {
                    var get = function (i) { return i >= 0 && r[i] ? r[i].trim() : ""; };
                    var s = {
                        number: get(idx.number), title: get(idx.title), singer: get(idx.singer),
                        lyricist: get(idx.lyricist), composer: get(idx.composer), extra: get(idx.extra)
                    };
                    s.hay = norm([s.number, s.title, s.singer, s.lyricist, s.composer, s.extra].join(" "));
                    return s;
                });
                input.disabled = false;
                input.focus();
                idleMessage();
            })
            .catch(function (e) { status.textContent = "Could not load the catalog (" + e.message + ")."; });

        function render(matches, terms) {
            var frag = document.createDocumentFragment();
            frag.appendChild(headTpl.content.firstElementChild.cloneNode(true));
            matches.forEach(function (s) { frag.appendChild(buildRow(rowTpl, s, terms)); });
            out.replaceChildren(frag);
        }

        function search() {
            var terms = norm(input.value).trim().split(/\s+/).filter(Boolean);
            if (!terms.length) { out.replaceChildren(); idleMessage(); return; }

            var matches = songs.filter(function (s) {
                return terms.every(function (t) { return s.hay.indexOf(t) !== -1; });
            });

            if (!matches.length) { out.replaceChildren(); status.textContent = "No matches."; return; }
            status.textContent = matches.length.toLocaleString() + " match" +
                (matches.length === 1 ? "" : "es") +
                (matches.length > max ? " (showing first " + max + ", refine your search)" : "");
            render(matches.slice(0, max), terms);
        }

        var timer;
        input.addEventListener("input", function () {
            clearTimeout(timer);
            timer = setTimeout(search, 80);
        });
    }

    document.querySelectorAll(".ks:not([data-init])").forEach(function (el) {
        el.dataset.init = "1";
        init(el);
    });
})();
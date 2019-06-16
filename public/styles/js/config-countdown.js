(function (e) {
    
    "use strict"; 
    // Use strict

    try {
        e(".cd100").each(function () {
            var t = e(this),
                n = 0,
                a = 0,
                s = 0,
                i = 0,
                o = 0,
                r = 0,
                d = t.find("[data-years]"),
                l = t.find("[data-weeks]"),
                c = t.find("[data-days]"),
                f = t.find("[data-hours]"),
                u = t.find("[data-minutes]"),
                p = t.find("[data-seconds]");
            null != d && (n = d.data("years")), null != l && (a = l.data("weeks")), null != c && (s = c.data("days")), null != f && (i = f.data("hours")), null != u && (o = u.data("minutes")), null != p && (r = p.data("seconds")), t.countdown100({
                endtimeYear: n,
                endtimeWeek: a,
                endtimeDate: s,
                endtimeHours: i,
                endtimeMinutes: o,
                endtimeSeconds: r,
                timeZone: ""
            })
        })
    } catch (e) {
        console.log(e)
    }
}(jQuery));
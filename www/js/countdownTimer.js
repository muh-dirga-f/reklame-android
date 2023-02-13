function countdownTimer(idTarget, tanggal, status, namaDB) {
    var $target = $('#' + idTarget);
    if (status == "aktif") {
        var timestamp = Date.parse(tanggal) - Date.now();
        timestamp /= 1000; // from ms to seconds
        function component(x, v) {
            return Math.floor(x / v);
        }

        setInterval(function () {
            timestamp--;

            var days = component(timestamp, 24 * 60 * 60),
                hours = component(timestamp, 60 * 60) % 24,
                minutes = component(timestamp, 60) % 60,
                seconds = component(timestamp, 1) % 60;
            if (days >= 0) {
                $target.html(days + " hari, " + hours + ":" + minutes + ":" + seconds);
            } else {
                $target.html("selesai");
                //TODO :
                //* 1. ubah status menjadi nonaktif
                firebase.database().ref(namaDB).update({ "status": "nonaktif" });
                //* 2. nonaktifkan FAB button
                $('#fab-tawar').css('display', 'none');
            }

        }, 1000);
    } else {
        $target.html("selesai");
        $('#fab-tawar').css('display', 'none');
    }
}
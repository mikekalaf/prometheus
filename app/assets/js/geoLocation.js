/**
 * Created by mikeburden on 12/6/16.
 */
function trilaterate (beacons) {
    var P1, P2, P3, d, deg, earthR, ex, ey, ez, i, j, rad, triPt, x, y, z, _ref;
    earthR = 6371;
    rad = function (deg) {
        return deg * math.pi / 180;
    };
    deg = function (rad) {
        return rad * 180 / math.pi;
    };
    _ref = beacons.map(function (beacon) {
        return [earthR * math.cos(rad(beacon.lat)) * math.cos(rad(beacon.lon)), earthR * math.cos(rad(beacon.lat)) * math.sin(rad(beacon.lon)), earthR * math.sin(rad(beacon.lat))];
    }), P1 = _ref[0], P2 = _ref[1], P3 = _ref[2];

    ex = math.divide(math.subtract(P2, P1), math.norm(math.subtract(P2, P1)));
    i = math.dot(ex, math.subtract(P3, P1));
    ey = math.divide(math.subtract(math.subtract(P3, P1), math.multiply(i, ex)), math.norm(math.subtract(math.subtract(P3, P1), math.multiply(i, ex))));
    ez = math.cross(ex, ey);
    d = math.norm(math.subtract(P2, P1));
    j = math.dot(ey, math.subtract(P3, P1));
    x = (Math.pow(beacons[0].dist, 2) - Math.pow(beacons[1].dist, 2) + Math.pow(d, 2)) / (2 * d);
    y = (Math.pow(beacons[0].dist, 2) - Math.pow(beacons[2].dist, 2) + Math.pow(i, 2) + Math.pow(j, 2)) / (2 * j) - (i / j * x);
    z = math.sqrt(math.abs(Math.pow(beacons[0].dist, 2) - Math.pow(x, 2) - Math.pow(y, 2)));
    triPt = math.add(math.add(math.add(P1, math.multiply(x, ex)), math.multiply(y, ey)), math.multiply(z, ez));

    return {
        lat: deg(math.asin(math.divide(triPt[2], earthR))),
        lon: deg(Math.atan2(triPt[1], triPt[0]))
    };
};
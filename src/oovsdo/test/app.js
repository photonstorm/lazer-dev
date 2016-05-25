var cos = Math.cos,
    sin = Math.sin;

function TEST1_Particle(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
}
TEST1_Particle.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};
TEST1_Particle.prototype.setVelocity = function (x, y) {
    this.vx = x;
    this.vy = y;
};
TEST1_Particle.prototype.update = function () {
    /*this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x < 0 || this.x > canvasWidth) {
        this.velocity.x *= -1;
    }
    if (this.y < 0 || this.y > canvasHeight) {
        this.velocity.y *= -1;
    }*/
};
TEST1_Particle.prototype.render = function (ctx) {
    ctx.drawRect(this.x, this.y, 1, 1);
};

function TEST2_ParticleSystem(capacity) {
    return {
        positionX: new Float32Array(capacity),
        positionY: new Float32Array(capacity),
        velocityX: new Float32Array(capacity),
        velocityY: new Float32Array(capacity),
        capacity: capacity
    };
}

function TEST2_ParticleSystem_SetPosition(system, index, x, y) {
    system.positionX[index] = x;
    system.positionY[index] = y;
}

function TEST2_ParticleSystem_SetVelocity(system, index, x, y) {
    system.velocityX[index] = x;
    system.velocityY[index] = y;
}

function TEST2_ParticleSystem_Update(system) {
    var capacity = system.capacity,
        positionX = system.positionX,
        positionY = system.positionY,
        velocityX = system.velocityX,
        velocityY = system.velocityY,
        x = 0,
        y = 0;

    for (var i = 0; i < MAX_POINTS; i += 4) {
        positionX[i] += velocityX[i];
        positionX[i + 1] += velocityX[i + 1];
        positionX[i + 2] += velocityX[i + 2];
        positionX[i + 3] += velocityX[i + 3];
    }
    for (var i = 0; i < MAX_POINTS; i += 4) {
        positionY[i] += velocityY[i];
        positionY[i + 1] += velocityY[i + 1];
        positionY[i + 2] += velocityY[i + 2];
        positionY[i + 3] += velocityY[i + 3];
    }
    for (var i = 0; i < MAX_POINTS; i += 4) {
        x = positionX[i];
        if (x < 0 || x > canvasWidth)
            velocityX[i] *= -1;
        x = positionX[i + 1];
        if (x < 0 || x > canvasWidth)
            velocityX[i + 1] *= -1;
        x = positionX[i + 2];
        if (x < 0 || x > canvasWidth)
            velocityX[i + 2] *= -1;
        x = positionX[i + 3];
        if (x < 0 || x > canvasWidth)
            velocityX[i + 3] *= -1;
    }
    for (var i = 0; i < MAX_POINTS; i += 4) {
        y = positionY[i];
        if (y < 0 || y > canvasHeight)
            velocityY[i] *= -1;
        y = positionY[i + 1];
        if (y < 0 || y > canvasHeight)
            velocityY[i + 1] *= -1;
        y = positionY[i + 2];
        if (y < 0 || y > canvasHeight)
            velocityY[i + 2] *= -1;
        y = positionY[i + 3];
        if (y < 0 || y > canvasHeight)
            velocityY[i + 3] *= -1;
    }
}

function TEST2_ParticleSystem_Render(ctx, system) {
    var capacity = system.capacity,
        positionX = system.positionX,
        positionY = system.positionY,
        x0, y0, x1, y1, x2, y2, x3, y3;

    for (var i = 0; i < MAX_POINTS; i += 4) {
        x0 = positionX[i];
        y0 = positionY[i];
        x1 = positionX[i + 1];
        y1 = positionY[i + 1];
        x2 = positionX[i + 2];
        y2 = positionY[i + 2];
        x3 = positionX[i + 3];
        y3 = positionY[i + 3];

        ctx.drawRect(x0, y0, 1, 1);
        ctx.drawRect(x1, y1, 1, 1);
        ctx.drawRect(x2, y2, 1, 1);
        ctx.drawRect(x3, y3, 1, 1);
    }
}

var IS_IOS = (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) || (/(android)/i.test(navigator.userAgent));
var MAX_POINTS = IS_IOS ? 8000 : 85000;
var MAX_FRAMES = 250;

var canvas = null,
    context = null,
    canvasWidth = 0,
    canvasHeight = 0,
    oopPoints = null,
    dodPoints = null,
    useTEST1 = true,
    fpsMeter = null,
    midScreenX = 0,
    midScreenY = 0,
    runTestTEST1 = true,
    runTestTEST2 = false,
    perfTimeTEST1 = 0,
    perfTimeTEST2 = 0,
    frameCountTEST1 = 0,
    frameCountTEST2 = 0,
    avgFPS1 = 0,
    avgFPS2 = 0;

function updateTEST1() {
    for (var i = 0; i < MAX_POINTS; i += 4) {
        var point0 = oopPoints[i + 0],
            point1 = oopPoints[i + 1],
            point2 = oopPoints[i + 2],
            point3 = oopPoints[i + 3];

        point0.x += point0.vx;
        point0.y += point0.vy;
        if (point0.x < 0 || point0.x > canvasWidth) {
            point0.vx *= -1;
        }
        if (point0.y < 0 || point0.y > canvasHeight) {
            point0.vy *= -1;
        }

        point1.x += point1.vx;
        point1.y += point1.vy;
        if (point1.x < 0 || point1.x > canvasWidth) {
            point1.vx *= -1;
        }
        if (point1.y < 0 || point1.y > canvasHeight) {
            point1.vy *= -1;
        }

        point2.x += point2.vx;
        point2.y += point2.vy;
        if (point2.x < 0 || point2.x > canvasWidth) {
            point2.vx *= -1;
        }
        if (point2.y < 0 || point2.y > canvasHeight) {
            point2.vy *= -1;
        }

        point3.x += point3.vx;
        point3.y += point3.vy;
        if (point3.x < 0 || point3.x > canvasWidth) {
            point3.vx *= -1;
        }
        if (point3.y < 0 || point3.y > canvasHeight) {
            point3.vy *= -1;
        }
    }
}

function renderTEST1(ctx) {
    for (var i = 0; i < MAX_POINTS; i += 4) {
        oopPoints[i].render(ctx);
        oopPoints[i + 1].render(ctx);
        oopPoints[i + 2].render(ctx);
        oopPoints[i + 3].render(ctx);
    }
}

function loopTEST2() {
    var t0 = t1 = 0;
    fast2d.clear(0, 0, 0);
    t0 = performance.now();
    // We are only testing
    // the memory access
    TEST2_ParticleSystem_Update(dodPoints);
    t1 = performance.now();
    TEST2_ParticleSystem_Render(fast2d, dodPoints);
    perfTimeTEST2 += t1 - t0;
    if (frameCountTEST2 < MAX_FRAMES) {
        ++frameCountTEST2;
        requestAnimationFrame(loopTEST2);
    } else {
        finishTest();
    }
    fast2d.flush();
}

function loopTEST1() {
    var t0 = t1 = 0;
    fast2d.clear(0, 0, 0);
    t0 = performance.now();
    // We are only testing
    // the memory access
    updateTEST1();
    t1 = performance.now();
    renderTEST1(fast2d);
    perfTimeTEST1 += t1 - t0;
    if (frameCountTEST1 < MAX_FRAMES) {
        ++frameCountTEST1;
        requestAnimationFrame(loopTEST1);
    } else {
        finishTest();
    }
    fast2d.flush();
}

function finishTest() {
    if (frameCountTEST1 >= MAX_FRAMES && frameCountTEST2 >= MAX_FRAMES) {
        console.profileEnd('ProfileDataOriented');
        console.profileEnd('ProfileObjectOriented');
        var data = 'Test-1 Frame Count: ' + frameCountTEST1 + ' | Test-2 Frame Count: ' + frameCountTEST2,
            total0 = (perfTimeTEST1 / frameCountTEST1),
            total1 = (perfTimeTEST2 / frameCountTEST2),
            color0 = total0 < total1 ? 'green' : 'red',
            color1 = total1 < total0 ? 'green' : 'red';

        data += '<p>Total Time Test-1: ' + perfTimeTEST1 + ' ms</p>';
        data += '<p>Total Time Test-2: ' + perfTimeTEST2 + ' ms</p>';
        data += '<p style="color:' + color0 + ';">Avg Exec Time Test-1:  ' + total0.toFixed(2) + ' ms</p>';
        data += '<p style="color:' + color1 + ';">Avg Exec Time Test-2:  ' + total1.toFixed(2) + ' ms</p>';
        var obj = {
            ua: navigator.userAgent,
            vendor: navigator.vendor,
            platform: navigator.platform,
            T1: {
                time: perfTimeTEST1,
                avgTime: total0,
                avgFPS: avgFPS1 / frameCountTEST1
            },
            T2: {
                time: perfTimeTEST2,
                avgTime: total1,
                avgFPS: avgFPS2 / frameCountTEST2
            }
        };
        sendData(obj);
        document.getElementById('testname').innerHTML = 'Done. Thanks!<br>Results are <a href="read_perf.html">here</a>.<br>Session Result: <br>' + data; /*data;*/
    } else {
        if (frameCountTEST1 === 0) {
            console.profileEnd('ProfileDataOriented');
            console.profile('ProfileObjectOriented');
            document.getElementById('testname').innerHTML = 'Running Test-1 benchmark';
            fast2d.setColor(0, 1, 0);
            requestAnimationFrame(loopTEST1);
        } else {
            console.profileEnd('ProfileObjectOriented');
            console.profile('ProfileDataOriented');
            document.getElementById('testname').innerHTML = 'Running Test-2 benchmark';
            fast2d.setColor(1, 0, 0);
            requestAnimationFrame(loopTEST2);
        }
    }
}

function sendData(object) {
    var str = JSON.stringify(object);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save.php', true);
    xhr.send(str);
}

function runTests(test) {
    if (test === 0) {
        document.getElementById('testname').innerHTML = 'Running Test-1 benchmark';
        fast2d.setColor(0, 1, 0);
        console.profile('ProfileObjectOriented');
        requestAnimationFrame(loopTEST1);

    } else {
        document.getElementById('testname').innerHTML = 'Running Test-2 benchmark';
        fast2d.setColor(1, 0, 0);
        console.profile('ProfileDataOriented');
        requestAnimationFrame(loopTEST2);
    }
}

window.addEventListener('load', function () {
    var random = Math.random,
        cos = Math.cos,
        sin = Math.sin,
        speed = 10;

    canvasWidth = fast2d.width;
    canvasHeight = fast2d.height;
    midScreenX = canvasWidth / 2;
    midScreenY = canvasHeight / 2;


    oopPoints = new Array(MAX_POINTS);
    dodPoints = TEST2_ParticleSystem(MAX_POINTS);

    // init data

    for (var i = 0; i < MAX_POINTS; ++i) {
        oopPoints[i] = new TEST1_Particle(midScreenX, midScreenY, random() * cos(i) * speed, random() * sin(i) * speed);
        TEST2_ParticleSystem_SetPosition(dodPoints, i, midScreenX, midScreenY);
        TEST2_ParticleSystem_SetVelocity(dodPoints, i, random() * cos(i) * speed, random() * sin(i) * speed);
    }
    fast2d.setColor(1, 0, 0);
    runTests(((random() * 1000) | 0) % 2);
});
let MicrofrontendsProcess = require('../obj/src/container/MicrofrontendsProcess').MicrofrontendsProcess;

try {
    new MicrofrontendsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}

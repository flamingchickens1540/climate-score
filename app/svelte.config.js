import sveltePreprocess from 'svelte-preprocess';

const preprocessOptions = {
    sourceMap: true, // "you would always want sourcemaps for the IDE" – dummdidumm
    defaults: {
        script: "typescript",
        style: "scss",
    },
    scss: {
        prependData: `@import 'src/styles/_variables.scss';`
    }
};

export default {
    preprocess: sveltePreprocess(preprocessOptions),

    // Export this to allow rollup.config.js to inherit the same preprocess options.
    preprocessOptions,
}
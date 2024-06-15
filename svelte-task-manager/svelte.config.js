import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

export default {
    kit: {
        adapter: adapter(),
        alias: {
            $stores: 'src/stores',
            $lib: 'src/lib'
        }
    },
    preprocess: preprocess()
};

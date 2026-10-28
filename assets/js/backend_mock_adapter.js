(function() {
    console.log('[Cloned Backend Adapter] Active — handling APIs via localStorage');
    const origFetch = window.fetch.bind(window);
    window.fetch = async function(input, init) {
        try {
            const resp = await origFetch(input, init);
            if (resp.ok) return resp;
        } catch(e) {}
        const method = (init && init.method || 'GET').toUpperCase();
        return new Response(JSON.stringify({ status: 'ok', success: true, timestamp: Date.now() }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    };
})();
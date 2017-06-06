import test from 'ava';
import kapPluginTest from 'kap-plugin-test';

test(async t => {
	const plugin = kapPluginTest('unicorn.gif');

	plugin.context.request.resolves({
		body: JSON.stringify({
			data: {
				id: 123
			}
		})
	});

	await plugin.run();

	t.is(plugin.context.request.lastCall.args[0], 'https://upload.giphy.com/v1/gifs');
	t.true(plugin.context.copyToClipboard.calledWith('https://giphy.com/gifs/123'));
});

import test from 'ava';
import StyleInjector from './index.js';

test('should expect a string', t => {
    t.throws(() => { StyleInjector().inject({}).into({}); }, 'An HTML string must be supplied');
});

test('should inject styles into an HTML string', t => {

    var styles = { table:'width:100%', td:'width:50%'};
    var testTable =     '<table class="customClass" id="specialTable"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr></table>';
    var injectedTable = '<table class="customClass" id="specialTable" style="width:100%"><tr><td style="width:50%">one</td><td style="width:50%">1</td></tr><tr><td style="width:50%">two</td><td style="width:50%">2</td></tr></table>';

    let injectedString = StyleInjector().inject(styles).into(testTable);
    t.is(injectedString, injectedTable);

});

test('should add to existing inline styles', t => {

    var styles = { table:'background-color:#000' };
    var testTable =     '<table style="color:#fff"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr></table>';
    var injectedTable = '<table style="color:#fff;background-color:#000"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr></table>';

    let injectedString = StyleInjector().inject(styles).into(testTable);
    t.is(injectedString, injectedTable);

});

test('should ignore existing semicolons in existing styles', t => {

    var styles = { div:'background-color:#000' };
    var input  = '<div style="color:#fff;border:none;"></div>';
    var output = '<div style="color:#fff;border:none;background-color:#000"></div>';

    let injectedString = StyleInjector().inject(styles).into(input);
    t.is(injectedString, output);

});

test('works with self-closing tags', t => {

    var styles = { input:'background-color:#000' };
    var input  = '<input type="text" value="test" id="textID" />';
    var output = '<input type="text" value="test" id="textID" style="background-color:#000"/>';

    let injectedString = StyleInjector().inject(styles).into(input);
    t.is(injectedString, output);

});

test('allows overwrite of existing styles', t => {

    var styles = { input:'background-color:white' };
    var input  = '<input type="text" value="test" id="textID" style="color:black;background-color:red;" />';
    var output1 = '<input type="text" value="test" id="textID" style="background-color:white"/>';
    var output2 = '<input type="text" value="test" id="textID" style="color:black;background-color:red;background-color:white"/>';

    let injectedString1 = StyleInjector().inject(styles, {overwrite:true}).into(input);
    let injectedString2 = StyleInjector().inject(styles, {overwrite:false}).into(input);
    let injectedString3 = StyleInjector().inject(styles).into(input);

    t.is(injectedString1, output1);
    t.is(injectedString2, output2);
    t.is(injectedString3, output2);

});
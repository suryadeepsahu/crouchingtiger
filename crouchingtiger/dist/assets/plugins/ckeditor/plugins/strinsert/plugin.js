﻿/**
 * @license Copyright © 2013 Stuart Sillitoe <stuart@vericode.co.uk>
 * This work is mine, and yours. You can modify it as you wish.
 *
 * Stuart Sillitoe
 * stuartsillitoe.co.uk
 *
 */

function strInsPluginReload() {

    CKEDITOR.plugins.add('strinsert',
    {
    	requires : ['richcombo'],
    	init : function( editor )
    	{
    		//  array of strings to choose from that'll be inserted into the editor
    		//var strings = [];
    		//strings.push(['[[First Name]]', 'First Name', 'First Name']);
    		//strings.push(['[[Last Name]]', 'Last Name', 'Last Name']);
    		//strings.push(['[[Group]]', 'Group', 'Group']);
    		//strings.push(['[[Password]]', 'Password', 'Password']);
            //strings.push(['[[Username]]', 'Username', 'Username']);
            var strings = editor.config.strinsert_strings;

    		// add the menu to the editor
    		editor.ui.addRichCombo('strinsert',
    		{
    			label: 		'Insert Field',
    			title: 		'Insert Field',
    			voiceLabel: 'Insert Field',
    			className: 	'cke_format',
    			multiSelect:false,
    			panel:
    			{
    				css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
    				voiceLabel: editor.lang.panelVoiceLabel
    			},

    			init: function()
    			{
    				this.startGroup( "Insert Content" );
    				for (var i in strings)
    				{
    					this.add(strings[i][0], strings[i][1], strings[i][2]);
    				}
    			},

    			onClick: function( value )
    			{
    				editor.focus();
    				editor.fire( 'saveSnapshot' );
    				editor.insertHtml(value);
    				editor.fire( 'saveSnapshot' );
    			}
    		});
    	}
    });

}
strInsPluginReload();

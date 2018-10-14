"use strict";


var HtmlGenerator = new Blockly.Generator('HTML');

HtmlGenerator.init = function(workspace) {};
HtmlGenerator.finish = function(code) {return code;};

HtmlGenerator.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = HtmlGenerator.blockToCode(nextBlock);
  return code + nextCode;
};


function removeIndentAndTrailingNewline() {
   
}

HtmlGenerator['baseframe'] = function(block) {
  var statements_head = HtmlGenerator.statementToCode(block, 'head');
  var statements_body = HtmlGenerator.statementToCode(block, 'body');

  var code = '<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset="utf-8">\n'
    + statements_head
    + "</head>\n\n<body>\n"
    + statements_body
    + "</body>\n</html>\n";

  return code;
};

HtmlGenerator['sphere'] = function(block) {

  var position = HtmlGenerator.valueToCode(block, 'position_vector', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "<a-sphere position='";

  if (position != "") {
    code += position + "'";
  } else {
    code += "2 2 -3'";
  }

  var radius = block.getFieldValue('radius');
  code += " radius='";
  if (radius != "") {
    code += radius + "'";
  } else {
    code += "1'";
  }

  var color = block.getFieldValue('color');
  code += " color='";
  if (color != "") {
    code += color + "'";
  } else {
    code += "#grey'";
  }
  
  code +=  " shadow></a-sphere>\n";

  return code;
};

HtmlGenerator['cylinder'] = function(block) {

  var position = HtmlGenerator.valueToCode(block, 'position_vector', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "<a-cylinder position='";

  if (position != "") {
    code += position + "'";
  } else {
    code += "1 2 -3'";
  }

  var radius = block.getFieldValue('radius');
  code += " radius='";
  if (radius != "") {
    code += radius + "'";
  } else {
    code += "1";
  }

  var height = block.getFieldValue('height');
  code += " height='";
  if (height != "") {
    code += height + "'";
  } else {
    code += "1";
  }

  var color = block.getFieldValue('color');
  code += " color='";
  if (color != "") {
    code += color + "'";
  } else {
    code += "#FFC65D'";
  }
  
  code +=  " shadow></a-cylinder>\n";

  return code;
};

HtmlGenerator['plane'] = function(block) {

  var position = HtmlGenerator.valueToCode(block, 'position_vector', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "<a-plane position='";

  if (position != "") {
    code += position + "'";
  } else {
    code += "1 0.75 -3'";
  }

  var rotation = HtmlGenerator.valueToCode(block, 'rotation_vector', Blockly.JavaScript.ORDER_ATOMIC);
  code += " rotation='";
  if (rotation != "") {
    code += rotation + "'";
  } else {
    code += "0 4.5 0'";
  }

  var width = block.getFieldValue('width');
  code += " width='";
  if (width != "") {
    code += width + "'";
  } else {
    code += "1'";
  }

  var height = block.getFieldValue('height');
  code += " height='";
  if (height != "") {
    code += height + "'";
  } else {
    code += "1'";
  }

  var color = block.getFieldValue('color');
  code += " color='";
  if (color != "") {
    code += color + "'";
  } else {
    code += "#FFC65D'";
  }
  
  code +=  " shadow></a-plane>\n";

  return code;
};


HtmlGenerator['html'] = function(block) {
  console.log(HtmlGenerator);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<!DOCTYPE HTML>\n<html>\n' + statements_content + '</html>\n';
  return code;
};


function getAllHtmlHeadSection() {
  
  var str = "<!DOCTYPE HTML>\n";
  str += "<html>\n";
  str += " <head>\n";
  str += "  <meta charset='utf-8'>\n";
  str += "   <title>Blockly HTML</title>\n";
  str += "   <script src='https://aframe.io/releases/0.8.2/aframe.min.js'></script>\n";
  str += "  </head>\n";
  str += "  <body>\n"
  str += "    <a-scene";
  return str;

}

HtmlGenerator['a_scene'] = function(block) {

  var code = getAllHtmlHeadSection();

  var background_color = block.getFieldValue('background_color');

  if (background_color != "") {
    code += " background= 'color: " + background_color + "'";
  }

  code += ">\n";

  var entities_content = HtmlGenerator.statementToCode(block, 'entities');

  if (entities_content != "") {
    code += entities_content;
  }

  code += "</a-scene>\n";
  code += "</body>\n</html>\n";
  
  return code;
};

HtmlGenerator['box'] = function(block) {

  var position = HtmlGenerator.valueToCode(block, 'position_vector', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "<a-box position='";

  if (position != "") {
    code += position + "'";
  } else {
    code += "-1 0.5 -3'";
  }

  var rotation = HtmlGenerator.valueToCode(block, 'rotation_vector', Blockly.JavaScript.ORDER_ATOMIC);
  code += " rotation='";
  if (rotation != "") {
    code += rotation + "'";
  } else {
    code += "0 4.5 0'";
  }

  var color = block.getFieldValue('color');
  code += " color='";
  if (color != "") {
    code += color + "'";
  } else {
    code += "#4CC3D9'";
  }
  
  code +=  " shadow></a-box>\n";

  return code;
}

HtmlGenerator['input_text'] = function(block) {
  return [block.getFieldValue('input_text'), Blockly.JavaScript.ORDER_ATOMIC];
}

HtmlGenerator['vector'] = function(block) {

  var x = block.getFieldValue('x');
  var y = block.getFieldValue('y');
  var z = block.getFieldValue('z');

  return [x + ' ' + y + ' ' + z, Blockly.JavaScript.ORDER_ATOMIC];
  
}

HtmlGenerator['background'] = function(block) {
  var properties_content = HtmlGenerator.statementToCode(block, 'background_properties');
  var code = '';

  if (properties_content != "") {
    code += "background='" + properties_content + "'";
  }
  return code;
};

HtmlGenerator['body'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<body>\n' + statements_content + '</body>\n';
  return code;
};

HtmlGenerator['load_aframe'] = function(block) {
  var code = '<script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>\n';
  return code;
};

HtmlGenerator['head'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<head>\n  <meta charset="utf-8">\n' + statements_content + '</head>\n';
  return code;
};

HtmlGenerator['title'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');

  if (statements_content != "")
    document.getElementById('title').innerText = statements_content;
  else
    document.getElementById('title').innerText = "untitled web page";

  var code = '<title>' + statements_content.trim() + '</title>\n';
  return code;
};

HtmlGenerator['paragraph'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<p>\n' + statements_content + '</p>\n';
  return code;
};

HtmlGenerator['plaintext'] = function(block) {
  var text_content = block.getFieldValue('content');
  var code = text_content + '\n';
  return code;
};

HtmlGenerator['division'] = function(block) {
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<div' + value_name + '>\n' + statements_content + '</div>\n';
  return code;
};

HtmlGenerator['style'] = function(block) {
  var statements_name = HtmlGenerator.statementToCode(block, 'NAME');
  var code = ' style="' + statements_name.trim() + '"';
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'color: ' + colour_name + ';';
  return code;
};

HtmlGenerator['bgcolour'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'background-color: ' + colour_name + ';';
  return code;
};

HtmlGenerator['genericstyle'] = function(block) {
  var text_property = block.getFieldValue('property');
  var text_value = block.getFieldValue('value');
  var code = text_property + ': ' + text_value + ';';
  return code;
};

HtmlGenerator['generictag'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<' + text_name + value_name + '>\n' + statements_content + '</' + text_name + '>\n';
  return code;
};

HtmlGenerator['more_attributes'] = function(block) {
  var value_name1 = HtmlGenerator.valueToCode(block, 'NAME1', HtmlGenerator.ORDER_ATOMIC);
  var value_name2 = HtmlGenerator.valueToCode(block, 'NAME2', HtmlGenerator.ORDER_ATOMIC);
  var value_name3 = HtmlGenerator.valueToCode(block, 'NAME3', HtmlGenerator.ORDER_ATOMIC);
  var code = value_name1 + value_name2 + value_name3;
  return [code, HtmlGenerator.ORDER_NONE];
};

HtmlGenerator['genericattribute'] = function(block) {
  var text_attribute = block.getFieldValue('attribute');
  var text_value = block.getFieldValue('value');
  var code = text_attribute + ':' + text_value + ';';
  return code;
};

HtmlGenerator['link'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<a href="' + text_name + '">' + statements_content.trim() + '</a>\n';
  return code;
};

HtmlGenerator['span'] = function(block) {
  var value_name = HtmlGenerator.valueToCode(block, 'NAME', HtmlGenerator.ORDER_ATOMIC);
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<span' + value_name + '>' + statements_content.trim() + '</span>\n';
  return code;
};

HtmlGenerator['image'] = function(block) {
  var text_image = block.getFieldValue('IMAGE');
  var text_alt = block.getFieldValue('ALT');
  var code = '<img src="' +  text_image + '" alt="' + text_alt + '">\n';
  return code;
};

HtmlGenerator['emphasise'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<em>' + statements_content.trim() + '</em>\n';
  return code;
};

HtmlGenerator['strong'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<strong>' + statements_content.trim() + '</strong>\n';
  return code;
};

HtmlGenerator['headline'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<' + dropdown_name + '>' + statements_content.trim() + '</' +  dropdown_name + '>\n';
  return code;
};

HtmlGenerator['inserted'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<ins>' + statements_content.trim() + '</ins>\n';
  return code;
};

HtmlGenerator['deleted'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<del>' + statements_content.trim() + '</del>\n';
  return code;
};

HtmlGenerator['super'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<sup>' + statements_content.trim() + '</sup>\n';
  return code;
};

HtmlGenerator['sub'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<sub>' + statements_content.trim() + '</sub>\n';
  return code;
};

HtmlGenerator['code'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<code>\n' + statements_content + '</code>\n';
  return code;
};

HtmlGenerator['quote'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<q>' + statements_content.trim() + '</q>\n';
  return code;
};

HtmlGenerator['blockquote'] = function(block) {
  var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<blockquote>\n' + statements_content + '</blockquote>\n';
  return code;
};

HtmlGenerator['sample'] = function(block) {
var statements_content = HtmlGenerator.statementToCode(block, 'content');
  var code = '<samp>\n' + statements_content + '</samp>\n';
  return code;
};
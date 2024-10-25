const fs = require('fs')

var data = fs.readFileSync('input1.xml');

var encountered_text = '';
const lines = data.toString().split("\n");
let section_depth = 0;
let section_number = 0;
let subsection_number = 0;
let subsubsection_number = 0;
for (line in lines) {
  let current_line = lines[line];

  // if (current_line[0] !== '<') {
    // console.log(current_line)
  // }
  if (current_line.includes('</sec')) {
    section_depth -= 1;
  }
  if (current_line.includes('<sec')) {
    section_depth += 1;
    
    new_line = current_line.split('<sec').join('<sec depth=\"' + section_depth + '\"');
    current_line = new_line;
    if (current_line.includes('id="Sec')){
      if (section_depth == 1) { section_number += 1;
                              subsection_number = 0;
                              subsubsection_number = 0;
                              new_line = current_line.split('<title>').join('<title>'+section_number+ ' ');};
    if (section_depth == 2) { subsection_number += 1;
                            subsubsection_number = 0;
                           new_line = current_line.split('<title>').join('<title>'+section_number+'.'+subsection_number+ ' ');};
      if (section_depth == 3) { subsubsection_number += 1;
                              new_line = current_line.split('<title>').join('<title>'  +section_number+'.'+subsection_number+'.'+subsubsection_number+' ');};
      current_line = new_line;};
    };
  encountered_text = encountered_text.concat(current_line + '\n');
};
// encountered_text = encountered_text.split('sec').join('bob');

fs.writeFile("output1.xml", encountered_text, (err) => {
  if (err)
    console.log(err);
  else {
    console.log('file written successfully')
  }
});
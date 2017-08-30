	(function () {
		var chain = __init__ (__world__.itertools).chain;
		var Hexdump = __class__ ('Hexdump', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.lineIndex = 0;
			});},
			get explain () {return __get__ (this, function (self, dump) {
				var minhexwidth = 2 * 16;
				var bytehexwidth = 3 * 16 - 1;
				var text = dump.strip ();
				var zeroxfmt = '';
				var blankfmt = '';
				var z = text.py_split ('\n');
				var __iterable0__ = text.py_split ('\n');
				for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
					var line = __iterable0__ [__index0__];
					print ('1-------------');
					var addrend = line.find (': ');
					if ((0 < addrend && addrend < minhexwidth)) {
						var line = line.__getslice__ (addrend + 1, null, 1);
						var line = line.lstrip ();
					}
					else {
						var addrend = line.find ('  ');
						if ((0 < addrend && addrend < minhexwidth)) {
							var line = line.__getslice__ (addrend + 1, null, 1);
							var line = line.lstrip ();
						}
					}
					print ('-------------');
					print (line);
					if (line [2] == ' ') {
						print (line);
						var sepstart = (2 + 1) * 7 + 2;
						var sep = line.__getslice__ (sepstart, sepstart + 3, 1);
						if (sep.__getslice__ (0, 2, 1) == '  ' && sep.__getslice__ (2, null, 1) != ' ') {
							var hexdata2 = line.__getslice__ (0, sepstart, 1);
							hexdata2 += line.__getslice__ (sepstart + 1, bytehexwidth + 1, 1);
						}
						else if (sep.__getslice__ (2, null, 1) == ' ') {
							var hexdata = line.__getslice__ (0, sepstart, 1) + line.__getslice__ (sepstart + 3, bytehexwidth + 2, 1);
							var hexdata2 = line.__getslice__ (0, sepstart, 1) + line.__getslice__ (sepstart + 3, bytehexwidth + 2, 1);
						}
						else {
							var hexdata = line.__getslice__ (0, bytehexwidth, 1);
							var hexdata2 = line.__getslice__ (0, bytehexwidth, 1);
						}
						var line = hexdata2;
						print (hexdata2);
						if (blankfmt == '') {
							var blankfmt = hexdata2;
						}
						else {
							blankfmt += ' ' + hexdata2;
						}
						if (zeroxfmt == '') {
							var zeroxfmt = (' 0x' + ',0x'.join (line.strip ().py_split (' '))) + '\n';
						}
						else {
							zeroxfmt += ',0x' + ',0x'.join (line.strip ().py_split (' '));
						}
					}
				}
				print (blankfmt);
				return tuple ([zeroxfmt, blankfmt]);
			});}
		});
		var myhexdump = Hexdump ();
		var __left0__ = myhexdump.explain ('00000000: 00 00 00 5B 68 65 78 64  75 6D 70 5D 00 00 00 00  ...[hexdump]....\n00000010: 00 11 22 33 44 55 66 77  88 99 0A BB CC DD EE FF  .."3DUfw........');
		var x = __left0__ [0];
		var y = __left0__ [1];
		__pragma__ ('<use>' +
			'itertools' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Hexdump = Hexdump;
			__all__.chain = chain;
			__all__.myhexdump = myhexdump;
			__all__.x = x;
			__all__.y = y;
		__pragma__ ('</all>')
	}) ();

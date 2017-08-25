from itertools import chain

class Hexdump:
    
    def __init__ (self):
        self.lineIndex = 0
    
        
    def explain (self,dump):
          '''
          Restore binary data from a hex dump.
            [x] dump argument as a string
            [ ] dump argument as a line iterator
        
          Supported formats:
            [x] hexdump.hexdump
            [x] Scapy
            [x] Far Manager
          '''
          minhexwidth = 2*16    # minimal width of the hex part - 00000... style
          bytehexwidth = 3*16-1 # min width for a bytewise dump - 00 00 ... style
        
          #global line
          text = dump.strip()  # ignore surrounding empty lines
          #global zeroxfmt
          zeroxfmt = ''
          blankfmt = ''
          for line in text.split('\n'):
            # strip address part
              addrend = line.find(':')
              if 0 < addrend < minhexwidth:  # : is not in ascii part
                  line = line[addrend+1:]
                  line = line.lstrip()
            # check dump type
              if line[2] == ' ':  # 00 00 00 ...  type of dump
              # check separator
                  sepstart = (2+1)*7+2  # ('00'+' ')*7+'00'
                  sep = line[sepstart:sepstart+3]
                  #print(line[sepstart:sepstart+3])
                  if sep[:2] == '  ' and sep[2:] != ' ':  # ...00 00  00 00...双空格
#                      hexdata = line[:bytehexwidth+1]
                      hexdata2 = line[:sepstart]
                      hexdata2 += line[sepstart+1:bytehexwidth+1]
                  elif sep[2:] == ' ':  # ...00 00 | 00 00...  - Far Manager
                      hexdata = line[:sepstart] + line[sepstart+3:bytehexwidth+2]
                  else:                 # ...00 00 00 00... - Scapy, no separator
                      hexdata = line[:bytehexwidth]
                  line = hexdata2
                  #line = line.strip()  # ignore surrounding empty lines
                  if blankfmt == '':
                      blankfmt=hexdata2
                  else:
                      blankfmt+=" "+hexdata2
                  if zeroxfmt == '':
                      zeroxfmt=" 0x"+",0x".join(line.strip().split(' '))+'\n'
                  else :
                      zeroxfmt+=",0x"+",0x".join(line.strip().split(' '))
          #print(zeroxfmt)
          print(blankfmt)
          #result += line
          return zeroxfmt,blankfmt
		  
myhexdump = Hexdump ()

#x,y=myhexdump.explain('00000000: 00 00 00 5B 68 65 78 64  75 6D 70 5D 00 00 00 00  ...[hexdump].... \
#00000010: 00 11 22 33 44 55 66 77  88 99 0A BB CC DD EE FF  .')

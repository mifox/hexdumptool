用python写的hex格式转换小工具：
用于方便协议分析使用：

已经实现功能：
1）用于从smartsniffer 复制的hexdump格式 到 c#等语言的二进制数组定义。
from
00000000: 00 00 00 5B 68 65 78 64  75 6D 70 5D 00 00 00 00  ...[hexdump]....
00000010: 00 11 22 33 44 55 66 77  88 99 0A BB CC DD EE FF  .."3DUfw........
to
 0x00,0x00,0x00,0x5B,0x68,0x65,0x78,0x64,0x75,0x6D,0x70,0x5D,0x00,0x00,0x00,0x00
,0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x99,0x0A,0xBB,0xCC,0xDD,0xEE,0xFF


2）用于从smartsniffer 复制的hexdump格式 到 sokit 发送数据包。
from
00000000: 00 00 00 5B 68 65 78 64  75 6D 70 5D 00 00 00 00  ...[hexdump]....
00000010: 00 11 22 33 44 55 66 77  88 99 0A BB CC DD EE FF  .."3DUfw........
to
 0x00,0x00,0x00,0x5B,0x68,0x65,0x78,0x64,0x75,0x6D,0x70,0x5D,0x00,0x00,0x00,0x00
,0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x99,0x0A,0xBB,0xCC,0xDD,0xEE,0xFF



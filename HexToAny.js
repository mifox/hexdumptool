function InsertString(t, c, n) {
    var r = new Array();
    for (var i = 0; i * 2 < t.length; i++) {
        r.push(t.substr(i * 2, n));
    }
    return r.join(c);
}
function FillString(t, c, n, b) {
    if ((t == "") || (c.length != 1) || (n <= t.length)) {
        return t;
    }
    var l = t.length;
    for (var i = 0; i < n - l; i++) {
        if (b == true) {
            t = c + t;
        }
         else {
            t += c;
        }
    }
    return t;
}

function Canonical(input)
{
  output = new String()
  numerals = new String()
  expstr = new String()
  signstr = new String()
  expsignstr = new String()
  expstrtmp = new String()

  var locE, stop, expnum, locDPact, locDP, start, MSDfound, index, expdelta
  var expstart, expprecision

  numerals = "0123456789";

  expprecision = 5

  input = input.toUpperCase()

  locE = input.indexOf("E");
  if (locE != -1)
  {
    stop = locE
    expstr = input.substring(locE + 1, input.length)
    expnum = expstr * 1
  }
  else
  {
    stop = input.length
    expnum = 0
  }

  locDPact = input.indexOf(".");
  if (locDPact != -1)
    locDP = locDPact
  else
    locDP = stop

  start = 0
  if (input.charAt(start) == "-")
  {
    start++
    signstr = "-"
  }
  else if (input.charAt(start) == "+")
  {
    start++
    signstr = "+"
  }
  else
    signstr = "+"

  MSDfound = false
  while ((start < stop) && !MSDfound)
  {
    index = 1
    while (index < numerals.length)
    {
      if (input.charAt(start) == numerals.charAt(index))
      {
        MSDfound = true
        break
      }
      index++
    }
    start++
  }
  start--

  if (MSDfound)
  {
    expdelta = locDP - start
    if (expdelta > 0)
      expdelta = expdelta - 1

    expnum = expnum + expdelta
  }
  else  //No significant digits found, value is zero
    expnum = 0

  expstrtmp = "" + expnum

  expstart = 0
  if (expstrtmp.charAt(expstart) == "-")
  {
    expstart++
    expsignstr = "-"
  }
  else
    expsignstr = "+"

  expstr = "E" + expsignstr

  index = 0
  while (index < expprecision - expstrtmp.length + expstart)
  {
    expstr += "0"
    index++
  }

  expstr += expstrtmp.substring(expstart, expstrtmp.length)

  output = signstr

  if (locDPact == start + 1)
  {
    output += input.substring(start, stop)
  }
  else if (stop == start + 1)
  {
    output += input.substring(start, stop)
    output += "."
  }
  else if (locDPact < start)
  {
    output += input.substring(start, start + 1)
    output += "."
    output += input.substring(start + 1, stop)
  }
  else if (locDPact != -1)
  {
    output += input.substring(start, start + 1)
    output += "."
    output += input.substring(start + 1, locDPact)
    output += input.substring(locDPact + 1, stop)
  }
  else
  {
    output += input.substring(start, stop)
    output += "."
  }

  output += expstr

  return output;
}

function MostSigOrder(input)
{
  output = new String()
  expstr = new String()

  var expprecision, expbias, stop, expnum, index

  expprecision = 5
  expbias = 50000

  stop = input.indexOf("E");

  output = input.substring(stop + 1, input.length)
  expnum = output * 1
  expnum += expbias

  expstr = "" + expnum

  output = expstr

  index = 0
  while (index < expprecision - expstr.length)
  {
    output = "0" + output
    index++
  }

  output += input.substring(1, 2)
  output += input.substring(3, stop)

  return output;
}

function A_gt_B(A, B)
{
  numerals = new String()

  var greater, stop, index, Adigit, Bdigit

  numerals = "0123456789";

  greater = false

  if (A.length > B.length)
    stop = A.length
  else
    stop = B.length

  index = 0
  while (index < stop)
  {
    if (index < A.length)
      Adigit = numerals.indexOf(A.charAt(index))
    else
      Adigit = 0

    if (index < B.length)
      Bdigit = numerals.indexOf(B.charAt(index))
    else
      Bdigit = 0

    if (Adigit < Bdigit)
      break
    else if (Adigit > Bdigit)
    {
      greater = true
      break
    }

    index++
  }//end while

  return greater;
}

function OvfCheck(input)
{
  output = new String()

  //Is value magnitude greater than +1.7976931348623157E+00308
  if (A_gt_B(MostSigOrder(input), "5030817976931348623157"))
  {
    output = "Infinity"
    if (input.charAt(0) == "-")
      output = "-" + output
  }
  else
    output = input

  return output;
}


function HexToUInt(t) {
    t = t.replace(/\s+/g, "");
    if (t == "") {
        return "";
    }
    if (t == "00000000") {
        return "0";
    }
    if ((t.length > 8) || (isNaN(parseInt(t, 16)))) {
        return "Error";
    }
    if (t.length < 8) {
        t = FillString(t, "0", 8, true);
    }
    t = parseInt(t, 16);
	
    return t;
}

function HexToInt(t) {
    t = t.replace(/\s+/g, "");
    if (t == "") {
        return "";
    }
    if (t == "00000000") {
        return "0";
    }
    if ((t.length > 8) || (isNaN(parseInt(t, 16)))) {
        return "Error";
    }
    if (t.length < 8) {
        t = FillString(t, "0", 8, true);
    }
    t = parseInt(t, 16);
	var x = 256*256*256*128;
	if(t>x)
	{
		t=t-x*2;
	}
    return t;
}
function HexToSingle(t) {
    t = t.replace(/\s+/g, "");
    if (t == "") {
        return "";
    }
    if (t == "00000000") {
        return "0";
    }
    if ((t.length > 8) || (isNaN(parseInt(t, 16)))) {
        return "Error";
    }
    if (t.length < 8) {
        t = FillString(t, "0", 8, true);
    }
    t = parseInt(t, 16).toString(2);
    t = FillString(t, "0", 32, true);
    var s = t.substring(0, 1);
    var e = t.substring(1, 9);
    var m = t.substring(9);
    e = parseInt(e, 2) - 127;
    m = "1" + m;
	for (var i=0;i<127;i++)
	{
		m = m +"0";
	}
    if (e >= 0) {
        m = m.substr(0, e + 1) + "." + m.substring(e + 1)
    }
     else {
        m = "0." + FillString(m, "0", m.length - e - 1, true)
    }
    if (m.indexOf(".") == -1) {
        m = m + ".0";
    }
    var a = m.split(".");
    var mi = parseInt(a[0], 2);
    var mf = 0;
    for (var i = 0; i < a[1].length; i++) {
        mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
    }
    m = mi + parseFloat(mf);
    if (s == 1) {
        m = 0 - m;
    }
    return m;
}
function SingleToHex(t) {
    if (t == "") {
        return "";
    }
    t = parseFloat(t);
    if (isNaN(t) == true) {
        return "Error";
    }
    if (t == 0) {
        return "00000000";
    }
    var s,
    e,
    m;
    if (t > 0) {
        s = 0;
    }
     else {
        s = 1;
        t = 0 - t;
    }
    m = t.toString(2);
    if (m >= 1) {
        if (m.indexOf(".") == -1) {
            m = m + ".0";
        }
        e = m.indexOf(".") - 1;
    }
     else {
        e = 1 - m.indexOf("1");
    }
    if (e >= 0) {
        m = m.replace(".", "");
    }
     else {
        m = m.substring(m.indexOf("1"));
    }
    if (m.length > 24) {
        m = m.substr(0, 24);
    }
     else {
        m = FillString(m, "0", 24, false)
    }
    m = m.substring(1);
    e = (e + 127).toString(2);
    e = FillString(e, "0", 8, true);
    var r = parseInt(s + e + m, 2).toString(16);
    r = FillString(r, "0", 8, true);
    return InsertString(r, " ", 2).toUpperCase();
}
function FormatHex(t, n, ie) {
    var r = new Array();
    var s = "";
    var c = 0;
    for (var i = 0; i < t.length; i++) {
        if (t.charAt(i) != " ") {
            s += t.charAt(i);
            c += 1;
            if (c == n) {
                r.push(s);
                s = "";
                c = 0;
            }
        }
        if (ie == false) {
            if ((i == t.length - 1) && (s != "")) {
                r.push(s);
            }
        }
    }
    return r.join("\n");
}
function FormatHexBatch(t, n, ie) {
    var a = t.split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = FormatHex(a[i], n, ie);
    }
    return r.join("\n");
}



function FormatHexBatch_edian_t(t, n, ie) {
    var a = t.split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
		var b = a[i].split(" ");
		var a_t="";
		for (var j = b.length; j > 0; j--) {
			a_t = a_t+ b[j-1];
		}
        r[i] = FormatHex(a_t, n, ie);
    }
    return r.join("\n");
}

function HexToSingleBatch(t) {
    var a = FormatHexBatch(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        //r[i] = HexToSingle(a[i]);
		r[i] = compute32(a[i],true);
		
		
    }
    return r.join("\r\n");
}


function HexToSingleBatch_edian_t(t) {
    var a = FormatHexBatch_edian_t(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        //r[i] = HexToSingle(a[i]);
		r[i] = compute32(a[i],true);
    }
    return r.join("\r\n");
}

function HexToIntBatch(t) {
    var a = FormatHexBatch(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = HexToInt(a[i]);
    }
    return r.join("\r\n");
}

function HexToIntBatch_edian_t(t) {
    var a = FormatHexBatch_edian_t(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = HexToInt(a[i]);
    }
    return r.join("\r\n");
}

function HexToUIntBatch(t) {
    var a = FormatHexBatch(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = HexToUInt(a[i]);
    }
    return r.join("\r\n");
}

function HexToUIntBatch_edian_t(t) {
    var a = FormatHexBatch_edian_t(t, 8, true).split("\n");
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        r[i] = HexToUInt(a[i]);
    }
    return r.join("\r\n");
}













function SingleToHexBatch(t) {
    var a = t.split("\n");
	var r1 = new Array();
    var r = new Array();
    for (var i = 0; i < a.length; i++) {
        //r[i] = SingleToHex(a[i]);
		r1[i] = computehexfromfloat(a[i],true);
		r[i]  = r1[i].substring(0,2)+" "+r1[i].substring(2,4)+" "+r1[i].substring(4,6)+" "+r1[i].substring(6,8);
    }
    return r.join("\r\n");
}








//----------------------------
///ieee754


/*
  Copyright (c) 2003, City University of New York
  All rights reserved.

  Redistribution and use in source and binary forms, with or
  without modification, are permitted provided that the following
  conditions are met:

      * Redistributions of source code must retain the above
      * copyright notice, this list of conditions and the
      * following disclaimer.  Redistributions in binary form
      * must reproduce the above copyright notice, this list of
      * conditions and the following disclaimer in the
      * documentation and/or other materials provided with the
      * distribution.  Neither the name of Queens College of CUNY
      * nor the names of its contributors may be used to endorse
      * or promote products derived from this software without
      * specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
  CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
  INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
  OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  Original version by Quanfei Wen, 1997.
  Modifications by Kevin J. Brewer, 1998/09/15 to 1998/09/30

   - Reordered Hex2Bin and Convert2Bin (with Convert2Bin first) so that Unix
     'diff' has some chance at comparing this file with IEEE-754.html .
   - General clean-ups.
   - Found and corrected bug in exponent calculation (and most significant bit
     placement) when converting from a 64-bit normalized value to one which
     must be denormalized in the 32-bit format (normalized to normalized
     conversion was already fine).

   1998/10/06 to 1998/10/07

   - Added removal of input leading and trailing blanks by adding RemoveBlanks
     routine.
   - Greatly improved the efficiency of the Convert2Hex routine.

   1998/10/20

   - Allow power of 10 indicator in numStrClipOff to be "E" as well as "e" in
     case not all browsers use "e".
   - Found and corrected bug in 64-bit binary output created by some unknown
     JavaScript scoping problem for the symbol 'output' by introduction of the
     RemoveBlanks routine.

   1998/10/23

   - All settings of 'this.StatCond' to "normal" were removed in order to match
     IEEE-754.html, "normal" rather than "error" is now the default.

   1998/10/28

   - Redundant code in Convert2Bin "already special values" section to that in
     Hex2Bin removed.

   1999/03/04

   - Corrected displaying error in numStrClipOff when the number of digits of
     precision for a particular IEEE-754 format is less than the number of
     digits returned by the system (before the value is large enough that the
     system returns it in "E" notation).
     Error found by Bill Maxwell (billmax@compuserve.com).

   1999/03/05

   - The system returns values such as 1.0E21 simply as 1E21.  In numStrClipOff,
     made adjustments to correct the display output when the system returns such
     values.
     Due to the idealized nature of the input to numStrClipOff vs. that of
     Canonical, many simplifications to the code in numStrClipOff were made.

   - Added a Clear button next to the input field which clears the input field
     and all result fields.

   1999/05/17

   - Removed <FONT FACE="Arial"> which is not displayed the same by all browser
     versions.

   - Balanced all <FONT> tags with </FONT> tags.

   - Removed all value layout comments since that information is much better
     presented in the IEEE-754references.html file.

   - Aligned all "Bit xx" and "Bits xx - xx" headings.

   - Replaced all occurrences of the term "unnormalized" with the term
     "denormalized" preferred by the standard.

   - Changed the "Decimal value of the exponent" display from "b + [e] = [f]"
     to "[f] - b = [e]" where b = 127 or b = 1023

   - Headings "Exponent" changed to "Exponent Field" and headings
     "Decimal value of the exponent" changed to
     "Decimal value of exponent field and exponent".

   1999/05/28

   - Rounded the 32-bit decimal significand just like the 32-bit full decimal
     value.

   - Fixed displaying problem in numStrClipOff in which values of
     0.000000099... and smaller (in 32-bit) are displayed as 0.0000000 because
     the values are not small enough for the system to return them in "E"
     notation and similarly for 0.000000000000000099... and smaller in 64-bit.

*/

function Convert2Bin(outstring, statstring, signBit, power, rounding)
{
  output = new String()                 //Output

  var binexpnt, index1, index2, cnst, bias, lastbit, rounded, index3, binexpnt2
  var moreBits

  cnst = 2102		// 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
  bias = 1024

  //init
  for (index1 = 0; index1 < this.Size; index1++)  this.Result[index1] = 0     

  with (Math) 					
  {
    //sign bit
    this.Result[0] = signBit

    //obtain exponent value
    index1 = 0

    if (this.Size == 32) index2 = 9
    else index2 = 12

    if (rounding && (outstring == ""))
    {
      //find most significant bit of significand
      while ((index1 < cnst) && (this.BinVal[index1] != 1)) index1++

      binexpnt = bias - index1

      //regular normalized numbers
      if (binexpnt >= this.MinExp)
      {
				//the value is shifted until the most
        index1++		//significant 1 is to the left of the binary
				//point and that bit is implicit in the encoding
      }//if normalized numbers

      //support for zero and denormalized numbers
      //exponent underflow for this precision
      else
      {
        binexpnt = this.MinExp - 1
        index1 = bias - binexpnt
      }//if zero or denormalized (else section)


      //use round to nearest value mode

      //compute least significant (low-order) bit of significand
      lastbit = this.Size - 1 - index2 + index1

      //the bits folllowing the low-order bit have a value of (at least) 1/2
      if (this.BinVal[lastbit + 1] == 1)
      {
        rounded = 0

        //odd low-order bit
        if (this.BinVal[lastbit] == 1)
        {
          //exactly 1/2 the way between odd and even rounds up to the even,
          //so the rest of the bits don't need to be checked to see if the value
          //is more than 1/2 since the round up to the even number will occur
          //anyway due to the 1/2
          rounded = 1
        }//if odd low-order bit

        //even low-order bit
        else  //this.BinVal[lastbit] == 0
        {
          //exactly 1/2 the way between even and odd rounds down to the even,
          //so the rest of the bits need to be checked to see if the value
          //is more than 1/2 in order to round up to the odd number
          index3 = lastbit + 2
          while ((rounded == 0) && (index3 < cnst))
          {
            rounded = this.BinVal[index3]
            index3++
          }//while checking for more than 1/2

        }//if even low-order bit (else section)

        //do rounding "additions"
        index3 = lastbit
        while ((rounded == 1) && (index3 >= 0))
        {
          // 0 + 1 -> 1 result with 0 carry
          if (this.BinVal[index3] == 0)
          {
            // 1 result
            this.BinVal[index3] = 1

            // 0 carry
            rounded = 0

          }//if bit is a 0

          // 1 + 1 -> 0 result with 1 carry
          else  //this.BinVal[index3] == 1
          {
            // 0 result
            this.BinVal[index3] = 0

            // 1 carry
//          rounded = 1
          }//if bit is a 1 (else section)

          index3--
        }//while "adding" carries from right to left in bits

      }//if at least 1/2

      //obtain exponent value
      index1 = index1 - 2
      if (index1 < 0) index1 = 0

    }//if rounding

    //find most significant bit of significand
    while ((index1 < cnst) && (this.BinVal[index1] != 1)) index1++

    binexpnt2 = bias - index1

    if (outstring == "")
    {
      binexpnt = binexpnt2

      //regular normalized numbers
      if ((binexpnt >= this.MinExp) && (binexpnt <= this.MaxExp))
      {
                                //the value is shifted until the most
        index1++                //significant 1 is to the left of the binary
                                //point and that bit is implicit in the encoding
      }//if normalized numbers

      //support for zero and denormalized numbers
      //exponent underflow for this precision
      else if (binexpnt < this.MinExp)
      {
        if (binexpnt2 == bias - cnst)
          //value is truely zero
          this.StatCond = "normal"
        else if (binexpnt2 < this.MinUnnormExp)
          this.StatCond = "underflow"
        else
          this.StatCond = "denormalized"

        binexpnt = this.MinExp - 1
        index1 = bias - binexpnt
      }//if zero or denormalized (else if section)
    }

    else //already special values
    {
      binexpnt = power
      index1 = bias - binexpnt

      //compute least significant (low-order) bit of significand
      lastbit = this.Size - 1 - index2 + index1

      moreBits = this.BinVal[lastbit]

      index3 = lastbit + 1
      while ((moreBits == 0) && (index3 < cnst))
      {
        moreBits = this.BinVal[index3]
        index3++
      }//while checking for more bits from other precision

      this.BinVal[lastbit] = moreBits

    }//if already special (else section)

    //copy the result
    while ((index2 < this.Size) && (index1 < cnst))
    {
      this.Result[index2] = this.BinVal[index1]
      index2++
      index1++
    }//while

    //max exponent for this precision
    if ((binexpnt > this.MaxExp) || (outstring != ""))
    {
      binexpnt = this.MaxExp + 1

      //overflow of this precision, set infinity
      if (outstring == "")
      {
        this.StatCond = "overflow"
        this.DispStr = "Infinity"

        if (this.Result[0] == 1)
          this.DispStr = "-" + this.DispStr

        if (this.Size == 32) index2 = 9
        else index2 = 12

        //zero the significand
        while (index2 < this.Size)
        {
          this.Result[index2] = 0
          index2++
        }//while

      }//if overflowed

      else //already special values
      {
        this.StatCond = statstring
        this.DispStr = outstring
      }//if already special (else section)

    }//if max exponent

    //convert exponent value to binary representation
    if (this.Size == 32) index1 = 8
    else index1 = 11
    this.BinaryPower = binexpnt
    binexpnt += this.ExpBias		//bias
    while ((binexpnt / 2) != 0)
    {
      this.Result[index1] = binexpnt % 2
      if (binexpnt % 2 == 0) binexpnt = binexpnt / 2
        else binexpnt = binexpnt / 2 - 0.5
      index1 -= 1
    }

    //output binary result
    output = ""
    for (index1 = 0; index1 < this.Size; index1++) 
      output = output + this.Result[index1]  
    return output

  }//with Math
}

function UndfCheck(input)
{
  output = new String()

  //Is value magnitude less than +2.4703282292062328E-00324
  if (A_gt_B("4967624703282292062328", MostSigOrder(input)))
    output = "underflow"
  else
    output = "normal"

  return output;
}

function Hex2Bin(input)
{
  output = new String()                 //Output
  numerals = new String()

  var index1, nibble, i, s, binexpnt, cnst, bias, index2, zeroFirst, zeroRest
  var binexpnt2, index3

  cnst = 2102           // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
  bias = 1024

  //init
  numerals = "0123456789ABCDEF"

  for (index1 = 0; index1 < cnst; index1++)  this.BinVal[index1] = 0

  for (index1 = 0; index1 < this.Size; index1++)  this.Result[index1] = 0

  with (Math)
  {

    input = RemoveBlanks(input)

    if (input.length > (this.Size / 4))
    {
      alert("too many hex digits")
      output = "exit"
      return output
    }

    else if (input.length < (this.Size / 4))
    {
      alert("too few hex digits")
      output = "exit"
      return output
    }

    else
    {
      input = input.toUpperCase()

      for (index1 = 0; index1 < this.Size; index1 +=4)
      {
        nibble = numerals.indexOf(input.charAt(index1 / 4))

        if (nibble == -1)
        {
          alert("invalid hex digit")
          output = "exit"
          return output
        }

        temp = nibble / 16

        for (i = 0; i < 4; i++)
        {
          temp *= 2
          if (temp >= 1)
          {
            this.Result[index1 + i] = 1
            temp --
          }
          else
            this.Result[index1 + i] = 0
        }
      }
    }

    //obtain exponent value
    binexpnt = 0

    if (this.Size == 32) index2 = 9
    else index2 = 12

    for (index1 = 1; index1 < index2; index1++)
      binexpnt += parseInt(this.Result[index1])*pow(2, index2 - index1 - 1)

    binexpnt -= this.ExpBias            //bias
    this.BinaryPower = binexpnt

    index1 = bias - binexpnt

    //regular normalized numbers
    if ((binexpnt >= this.MinExp) && (binexpnt <= this.MaxExp))
    {
      //the encoding's hidden 1 is inserted
      this.BinVal[index1] = 1
      index1++
    }//if normalized numbers

    index3 = index1

    //copy the input
    if (this.Result[index2] == 0)
      zeroFirst = true
    this.BinVal[index1] = this.Result[index2]
    index2++
    index1++

    zeroRest = true
    while ((index2 < this.Size) && (index1 < cnst))
    {
      if (this.Result[index2] == 1)
        zeroRest = false
      this.BinVal[index1] = this.Result[index2]
      index2++
      index1++
    }//while

    //find most significant bit of significand
    //for the actual denormalized exponent test for zero
    while ((index3 < cnst) && (this.BinVal[index3] != 1)) index3++
    binexpnt2 = bias - index3

    //zero and denormalized numbers
    if (binexpnt < this.MinExp)
    {
      if (binexpnt2 == bias - cnst)
        //value is truely zero
        this.StatCond = "normal"
      else if (binexpnt2 < this.MinUnnormExp)
        this.StatCond = "underflow"
      else
        this.StatCond = "denormalized"
    }//if zero or denormalized

    //max exponent for this precision
    else if (binexpnt > this.MaxExp)
    {
      if (zeroFirst && zeroRest)
      {
        //Infinity
        this.StatCond = "overflow"
        this.DispStr = "Infinity"
      }//if Infinity
      else if (!zeroFirst && zeroRest && (this.Result[0] == 1))
      {
        //Indeterminate quiet NaN
        this.StatCond = "quiet"
        this.DispStr = "Indeterminate"
      }//if Indeterminate quiet NaN (else if section)
      else if (!zeroFirst)
      {
        //quiet NaN
        this.StatCond = "quiet"
        this.DispStr = "NaN"
      }//if quiet NaN (else if section)
      else
      {
        //signaling NaN
        this.StatCond = "signaling"
        this.DispStr = "NaN"
      }//if signaling NaN (else section)

      if ((this.Result[0] == 1) && (this.DispStr != "Indeterminate"))
        this.DispStr = "-" + this.DispStr

    }//if max exponent (else if section)

    //output binary result
    output = ""
    for (index1 = 0; index1 < this.Size; index1++)
      output = output + this.Result[index1]
    return output

  }//with Math
}

function RemoveBlanks(input)
{
  output = new String()

  var start, stop

  start = 0
  while ((input.charAt(start) == " ") && (start < input.length))
    start++

  stop = input.length - 1
  while ((input.charAt(stop) == " ") && (stop >= 0))
    stop--

  output = input.substring(start, stop + 1)

  return output
}

function Convert2Hex()
{
  output = new String()
  numerals = new String()

  var temp, index, i

  numerals = "0123456789ABCDEF"

  with (Math)
  {
    //convert binary result to hex and output
    for (index = 0; index < this.Size; index +=4)
    {
      temp = 0
      for (i = 0; i < 4; i++)
        temp += pow(2, 3 - i)*this.Result[index + i]

      output = output + numerals.charAt(temp)
    }
  }
  return output
}

function numStrClipOff(input, precision)
{
  result = new String()
  numerals = new String()
  tempstr = new String()
  expstr = new String()
  signstr = new String()

  var locE, stop, expnum, locDP, start, MSD, MSDfound, index, expdelta, digits
  var number

  numerals = "0123456789";

  tempstr = input.toUpperCase()

  locE = tempstr.indexOf("E");
  if (locE != -1)
  {
    stop = locE
    expstr = input.substring(locE + 1, input.length)
    expnum = expstr * 1
  }
  else
  {
    stop = input.length
    expnum = 0
  }

  if (input.indexOf(".") == -1)
  {
    tempstr = input.substring(0, stop)
    tempstr += "."
    if (input.length != stop)
      tempstr += input.substring(locE, input.length)

    input = tempstr

    locE = locE + 1
    stop = stop + 1
  }

  locDP = input.indexOf(".");

  start = 0
  if (input.charAt(start) == "-")
  {
    start++
    signstr = "-"
  }
  else
    signstr = ""

  MSD = start
  MSDfound = false
  while ((MSD < stop) && !MSDfound)
  {
    index = 1
    while (index < numerals.length)
    {
      if (input.charAt(MSD) == numerals.charAt(index))
      {
        MSDfound = true
        break
      }
      index++
    }
    MSD++
  }
  MSD--

  if (MSDfound)
  {
    expdelta = locDP - MSD
    if (expdelta > 0)
      expdelta = expdelta - 1

    expnum = expnum + expdelta

    expstr = "e" + expnum
  }
  else  //No significant digits found, value is zero
    MSD = start

  digits = stop - MSD

  tempstr = input.substring(MSD, stop)

  if (tempstr.indexOf(".") != -1)
    digits = digits - 1

  number = digits
  if (precision < digits)
    number = precision

  tempstr = input.substring(MSD, MSD + number + 1)

  if ( (MSD != start) || (tempstr.indexOf(".") == -1) )
  {
    result = signstr
    result += input.substring(MSD, MSD + 1)
    result += "."
    result += input.substring(MSD + 1, MSD + number)

    while (digits < precision)
    {
      result += "0"
      digits += 1
    }

    result += expstr
  }
  else
  {
    result = input.substring(0, start + number + 1)

    while (digits < precision)
    {
      result += "0"
      digits += 1
    }

    if (input.length != stop)
      result += input.substring(locE, input.length)
  }

  return result;
}

function numCutOff(input, precision)
{
  result = new String()
  tempstr = new String()

  var temp = input;
  if(temp < 1)
    temp += 1;

  tempstr = "" + temp;

  tempstr = numStrClipOff(tempstr, precision);

  if(temp == input)
    result = tempstr.substring(0, 1);
  else
    result = "0";

  result += tempstr.substring(1, tempstr.length);

  return result;
}

function Convert2Dec()
{
  output = new String()

  var s, i, dp, val, hid, temp, decValue, power

  with (Math)
  {
  if (this.Size == 32) s = 9
  else s = 12

  if ((this.BinaryPower < this.MinExp) || (this.BinaryPower > this.MaxExp))
  {
    dp = 0
    val = 0
  }
  else
  {
    dp = - 1
    val = 1
  }

  for (i = s; i < this.Size; i++)
    val += parseInt(this.Result[i])*pow(2, dp + s - i)

  decValue = val * pow(2, this.BinaryPower)

  this.FullDecValue = decValue

  if (this.Size == 32)
  {
    s = 8
    if (val > 0)
    {
      power = floor( log(decValue) / LN10 )
      decValue += 0.5 * pow(10, power - s + 1)
      val += 5E-8
    }
  }
  else s = 17

  if (this.Result[0] == 1)
  {
    decValue = - decValue
    this.FullDecValue = - this.FullDecValue
  }

  //the system refuses to display negative "0"s with a minus sign
  this.DecValue = "" + decValue
  if ((this.DecValue == "0") && (this.Result[0] == 1))
    this.DecValue = "-" + this.DecValue

  this.DecValue = numStrClipOff(this.DecValue, s)

  output = numCutOff(val, s)

  } 
  return output
}

function Dec2Bin(input)
{
  var value, intpart, decpart, binexpnt, index1, cnst, bias

  cnst = 2102   // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
  bias = 1024

  //init
  for (index1 = 0; index1 < cnst; index1++)  this.BinVal[index1] = 0

  with (Math)
  {
    input = Canonical(input)

    //sign bit
    if (input.charAt(0) == "-")
      this.Result[0] = 1
    else
      this.Result[0] = 0

    //if value magnitude greater than 1.7976931348623157E+308, set infinity
    input = OvfCheck(input)

    if (input.indexOf("Infinity") != -1)
    {
      binexpnt = this.MaxExp + 1
      this.StatCond64 = "overflow"
      this.DispStr = input

    }//if greater than 1.7976931348623157E+308

    //Value magnitude is not greater than 1.7976931348623157E+308
    else
    {

      //if value magnitude less than 2.4703282292062328E-324, set "underflow".
      this.StatCond64 = UndfCheck(input)

      if (this.StatCond64 == "underflow")
      {
        binexpnt = this.MinExp - 1

      }//if less than 2.4703282292062328E-324

      //Value magnitude is not less than 2.4703282292062328E-324
      else
      {

        //convert 'input' from string to numeric
        input = input * 1.0

        //convert and seperate input to integer and decimal parts
        value = abs(input)
        intpart = floor(value)
        decpart = value - intpart

        //convert integer part
        index1 = bias
        while (((intpart / 2) != 0) && (index1 >= 0))
        {
          this.BinVal[index1] = intpart % 2
          if (intpart % 2 == 0) intpart = intpart / 2
            else intpart = intpart / 2 - 0.5
          index1 -= 1
        }

        //convert decimal part
        index1 = bias + 1
        while ((decpart > 0) && (index1 < cnst))
        {
          decpart *= 2
          if (decpart >= 1)
            {this.BinVal[index1] = 1; decpart --; index1++}
          else {this.BinVal[index1] = 0; index1++}
        }

        //obtain exponent value
        index1 = 0

        //find most significant bit of significand
        while ((index1 < cnst) && (this.BinVal[index1] != 1)) index1++

        binexpnt = bias - index1

        //support for zero and denormalized numbers
        //exponent underflow for this precision
        if (binexpnt < this.MinExp)
        {
          binexpnt = this.MinExp - 1

        }//if zero or denormalized

      }//if not less than 2.4703282292062328E-324 (else section)

    }//if not greater than 1.7976931348623157E+308 (else section)

    //output exponent value
    this.BinaryPower = binexpnt

  }//with Math
}

//object construction function
function ieee (Size){

  this.Size = Size
  this.BinaryPower = 0
  this.DecValue = ""
  this.FullDecValue = 0
  this.DispStr = ""
  this.Convert2Bin = Convert2Bin   //convert input to bin.
  this.Convert2Hex = Convert2Hex   //convert bin. to hex.
  this.Convert2Dec = Convert2Dec   //convert bin. significand to dec.
  this.Hex2Bin = Hex2Bin           //convert hex. to bin.
  this.Dec2Bin = Dec2Bin
  this.StatCond = "normal"
  this.BinString = ""
  // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
  this.BinVal = new Array(2102)    //Binary Representation
  if (Size == 32){
    this.ExpBias = 127
    this.MaxExp = 127
    this.MinExp = -126
    this.MinUnnormExp = -149
    this.Result = new Array(32)
  }
  else if (Size == 64){
    this.ExpBias = 1023
    this.MaxExp = 1023
    this.MinExp = -1022
    this.MinUnnormExp = -1074
    this.Result = new Array(64)
  }

}




function compute32(hex,rounding){
/*
  in this javascript program, bit positions are numbered 
  0 ~ 32/64 from left to right instead of right to left, the
  way the output is presented
*/

  var index1, cnst

  ieee32 = new ieee(32)
  ieee64 = new ieee(64)
  rs={}
  rs['obj.hex32b.value'] = hex
  rs['ieee32.BinString'] = ieee32.Hex2Bin(rs['obj.hex32b.value'])
  if (rs['ieee32.BinString'] != "exit")
  {
    rs['obj.bin32_0.value'] = ieee32.BinString.substring(0, 1)
    rs['obj.bin32_1.value'] = ieee32.BinString.substring(1, 9)
    if ((ieee32.BinaryPower < ieee32.MinExp) ||
        (ieee32.BinaryPower > ieee32.MaxExp))
    {
      rs['obj.bin32_9.value'] = "  "
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(9, 10)
      rs['obj.bin32_9.value'] += "."
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(10, 32)
    }
    else
    {
      rs['obj.bin32_9.value'] = "1 ."
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(9, 32)
    }
    rs['obj.stat32.value'] = ieee32.StatCond
    rs['obj.binpwr32.value'] = ieee32.BinaryPower
    rs['obj.binpwr32f.value'] = ieee32.BinaryPower + ieee32.ExpBias
    rs['obj.dec32sig.value'] = ieee32.Convert2Dec()
    if (ieee32.DispStr != "")
    {
      rs['obj.entered.value'] = ieee32.DispStr
      rs['obj.dec32.value'] = ieee32.DispStr
      rs['obj.dec32sig.value'] = ""
    }
    else
    {
      rs['obj.entered.value'] = ieee32.FullDecValue
      rs['obj.dec32.value'] = ieee32.DecValue
    }
    rs['obj.hex32.value'] = ieee32.Convert2Hex()

    cnst = 2102         // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    for (index1 = 0; index1 < cnst; index1++)
      ieee64.BinVal[index1] = ieee32.BinVal[index1]

    ieee64.BinString =
      ieee64.Convert2Bin(ieee32.DispStr, ieee32.StatCond, ieee32.Result[0],
                         ieee32.BinaryPower, false)
    rs['obj.bin64_0.value'] = ieee64.BinString.substring(0, 1)
    rs['obj.bin64_1.value'] = ieee64.BinString.substring(1, 12)
    if ((ieee64.BinaryPower < ieee64.MinExp) ||
        (ieee64.BinaryPower > ieee64.MaxExp))
    {
      rs['obj.bin64_12.value'] = "  "
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(12, 13)
      rs['obj.bin64_12.value'] += "."
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(13, 64)
    }
    else
    {
      rs['obj.bin64_12.value'] = "1 ."
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(12, 64)
    }
    rs['obj.stat64.value'] = ieee64.StatCond
    rs['obj.binpwr64.value'] = ieee64.BinaryPower
    rs['obj.binpwr64f.value'] = ieee64.BinaryPower + ieee64.ExpBias
    rs['obj.dec64sig.value'] = ieee64.Convert2Dec()
    if (ieee64.DispStr != "")
    {
      rs['obj.dec64.value'] = ieee64.DispStr
      rs['obj.dec64sig.value'] = ""
    }
    else
      rs['obj.dec64.value'] = ieee64.DecValue
    rs['obj.hex64.value'] = ieee64.Convert2Hex()
	//alert(JSON.stringify(rs))
	return rs['obj.dec32.value']
  }
}

function compute( rounding){
/*
  in this javascript program, bit positions are numbered 
  0 ~ 32/64 from left to right instead of right to left, the
  way the output is presented
*/

  var index1, cnst

  ieee32 = new ieee(32)
  ieee64 = new ieee(64)
  rs={}
  rs['obj.hex64b.value'] = 'FF FF FF FF'
  ieee64.BinString = ieee64.Hex2Bin(rs['obj.hex64b.value'])
  if (ieee64.BinString != "exit")
  {
    rs['obj.bin64_0.value'] = ieee64.BinString.substring(0, 1)
    rs['obj.bin64_1.value'] = ieee64.BinString.substring(1, 12)
    if ((ieee64.BinaryPower < ieee64.MinExp) ||
        (ieee64.BinaryPower > ieee64.MaxExp))
    {
      rs['obj.bin64_12.value'] = "  "
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(12, 13)
      rs['obj.bin64_12.value'] += "."
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(13, 64)
    }
    else
    {
      rs['obj.bin64_12.value'] = "1 ."
      rs['obj.bin64_12.value'] += ieee64.BinString.substring(12, 64)
    }
    rs['obj.stat64.value'] = ieee64.StatCond
    rs['obj.binpwr64.value'] = ieee64.BinaryPower
    rs['obj.binpwr64f.value'] = ieee64.BinaryPower + ieee64.ExpBias
    rs['obj.dec64sig.value'] = ieee64.Convert2Dec()
    if (ieee64.DispStr != "")
    {
      rs['obj.entered.value'] = ieee64.DispStr
      rs['obj.dec64.value'] = ieee64.DispStr
      rs['obj.dec64sig.value'] = ""
    }
    else
    {
      rs['obj.entered.value'] = ieee64.FullDecValue
      rs['obj.dec64.value'] = ieee64.DecValue
    }
     rs['obj.hex64.value'] = ieee64.Convert2Hex()

    cnst = 2102         // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    for (index1 = 0; index1 < cnst; index1++)
      ieee32.BinVal[index1] = ieee64.BinVal[index1]

    ieee32.BinString =
      ieee32.Convert2Bin(ieee64.DispStr, ieee64.StatCond, ieee64.Result[0],
                         ieee64.BinaryPower, rounding)
    rs['obj.bin32_0.value'] = ieee32.BinString.substring(0, 1)
    rs['obj.bin32_1.value'] = ieee32.BinString.substring(1, 9)
    if ((ieee32.BinaryPower < ieee32.MinExp) ||
        (ieee32.BinaryPower > ieee32.MaxExp))
    {
      rs['obj.bin32_9.value'] = "  "
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(9, 10)
      rs['obj.bin32_9.value'] += "."
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(10, 32)
    }
    else
    {
      rs['obj.bin32_9.value'] = "1 ."
      rs['obj.bin32_9.value'] += ieee32.BinString.substring(9, 32)
    }
    rs['obj.stat32.value'] = ieee32.StatCond
    rs['obj.binpwr32.value'] = ieee32.BinaryPower
    rs['obj.binpwr32f.value'] = ieee32.BinaryPower + ieee32.ExpBias
    rs['obj.dec32sig.value'] = ieee32.Convert2Dec()
    if (ieee32.DispStr != "")
    {
      rs['obj.dec32.value'] = ieee32.DispStr
      rs['obj.dec32sig.value'] = ""
    }
    else
      rs['obj.dec32.value'] = ieee32.DecValue
    rs['obj.hex32.value'] = ieee32.Convert2Hex()
  }
}



function computehexfromfloat(input,rounding){
/*
  in this javascript program, bit positions are numbered
  0 ~ 32/64 from left to right instead of right to left, the
  way the output is presented
*/
  ieee32 = new ieee(32)
  ieee64 = new ieee(64)

  var input, index1, cnst

  //input = obj.input.value
  input = RemoveBlanks(input)
  res={}

  ieee64.Dec2Bin(input)
  ieee64.BinString =
    ieee64.Convert2Bin(ieee64.DispStr, ieee64.StatCond64, ieee64.Result[0],
                         ieee64.BinaryPower, false)
  res['obj.bin64_0.value'] = ieee64.BinString.substring(0, 1)
  res['obj.bin64_1.value'] = ieee64.BinString.substring(1, 12)
  if ((ieee64.BinaryPower < ieee64.MinExp) ||
      (ieee64.BinaryPower > ieee64.MaxExp))
  {
    res['obj.bin64_12.value'] = "  "
    res['obj.bin64_12.value'] += ieee64.BinString.substring(12, 13)
    res['obj.bin64_12.value'] += "."
    res['obj.bin64_12.value'] += ieee64.BinString.substring(13, 64)
  }
  else
  {
    res['obj.bin64_12.value'] = "1 ."
    res['obj.bin64_12.value'] += ieee64.BinString.substring(12, 64)
  }
  res['obj.stat64.value'] = ieee64.StatCond
  res['obj.binpwr64.value'] = ieee64.BinaryPower
  res['obj.binpwr64f.value'] = ieee64.BinaryPower + ieee64.ExpBias
  res['obj.dec64sig.value'] = ieee64.Convert2Dec()
  if (ieee64.DispStr != "")
  {
    res['obj.dec64.value'] = ieee64.DispStr
    res['obj.dec64sig.value'] = ""
  }
  else
    res['obj.dec64.value'] = ieee64.DecValue
  res['obj.hex64.value'] = ieee64.Convert2Hex()

    cnst = 2102         // 1 (carry bit) + 1023 + 1 + 1022 + 53 + 2 (round bits)
    for (index1 = 0; index1 < cnst; index1++)
      ieee32.BinVal[index1] = ieee64.BinVal[index1]

  res['ieee32.BinString'] =
    ieee32.Convert2Bin(ieee64.DispStr, ieee64.StatCond64, ieee64.Result[0],
                         ieee64.BinaryPower, rounding)
  res['obj.bin32_0.value'] = ieee32.BinString.substring(0, 1)
  res['obj.bin32_1.value'] = ieee32.BinString.substring(1, 9)
  if ((ieee32.BinaryPower < ieee32.MinExp) ||
      (ieee32.BinaryPower > ieee32.MaxExp))
  {
    res['obj.bin32_9.value'] = "  "
    res['obj.bin32_9.value'] += ieee32.BinString.substring(9, 10)
    res['obj.bin32_9.value'] += "."
    res['obj.bin32_9.value'] += ieee32.BinString.substring(10, 32)
  }
  else
  {
    res['obj.bin32_9.value'] = "1 ."
    res['obj.bin32_9.value'] += ieee32.BinString.substring(9, 32)
  }
  res['obj.stat32.value'] = ieee32.StatCond
  res['obj.binpwr32.value'] = ieee32.BinaryPower
  res['obj.binpwr32f.value'] = ieee32.BinaryPower + ieee32.ExpBias
  res['obj.dec32sig.value'] = ieee32.Convert2Dec()
  if (ieee32.DispStr != "")
  {
    res['obj.dec32.value'] = ieee32.DispStr
    res['obj.dec32sig.value'] = ""
  }
  else
    res['obj.dec32.value'] = ieee32.DecValue
  res['obj.hex32.value'] = ieee32.Convert2Hex()

  if ((ieee64.DispStr != "") && (ieee32.DispStr != ""))
    res['obj.entered.value'] = ieee64.DispStr
  else
    res['obj.entered.value'] = input * 1.0
    return  res['obj.hex32.value']
}

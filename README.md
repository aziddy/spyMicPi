# spyMicPi
Stream Mic Audio Stream from Pi to VPS to Remote Computer


## CLI Reporting No Audio Data Fed To Speaker (bufferunderflow) Mac OSX
 go to ../node_modules/speaker/deps/mpg123/src/output/coreaudio.c:81 and find

```
warning("Didn't have any audio data in callback (buffer underflow)");
```
comment it out then

```
npm rebuild speaker
```

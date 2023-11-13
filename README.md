# Hanium_ChatBot

## google-translate API
<p>
  https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations/translateText
</p>

## Test 결과 

## 실제 구현
POST https://www.googleapis.com/language/translate/v2?

**설정방법**


[Params]
|key |Value|
|:---:|:---:|
|key|myapikey|



[Headers]
|key |Value|
|:---:|:---:|
|Content-Type   |application/json; charset=utf-8|



[Body]</br>
|raw - Json|
|:------:|
|{"q" :"안녕녕", "source": "ko", "target" : "en", "format":"text" } |



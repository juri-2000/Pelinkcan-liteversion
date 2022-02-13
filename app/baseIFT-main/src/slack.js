function slackChannel(webhook, message) {
  const jsonData = {
    'text' : message
  };

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(jsonData)
  };

  UrlFetchApp.fetch(webhook, options);
}

function fireWorkflow(webhook) {
  const options = {
    'method' : 'post',
    'contentType' : 'application/json'
  };
  UrlFetchApp.fetch(webhook, options);
}

function slackChannelbyToken(token, channelName, text, fileUrl){
  let url;
  let payload = {
    token: token,
  };

  if(fileUrl === undefined || fileUrl === ''){
    url = 'https://slack.com/api/chat.postMessage';
    payload.channel = `#${channelName}`;
    payload.text = text;
  }else{
    url = 'https://slack.com/api/files.upload';
    payload.channels = channelName;
    payload.file = UrlFetchApp.fetch(fileUrl).getBlob();
    payload.initial_comment = text;
  }

  const option = {
    method: 'POST',
    payload: payload,
  };

  UrlFetchApp.fetch(url, option);
}

function slackDMFromAle(token, id, text){

  const url = 'https://slack.com/api/chat.postMessage?'
    + 'icon_emoji=:えーるくん:'
    + '&username=エールくん'
  ;
  const option = {
    method: 'POST',
    payload : {
      token: token,
      channel: '@' + id,
      text: text,
    },
  };

  UrlFetchApp.fetch(url, option);
}

function slackDM(token, id, text){

  const url = 'https://slack.com/api/chat.postMessage';
  const option = {
    method: 'POST',
    payload : {
      token: token,
      channel: '@' + id,
      text: text,
    },
  };

  UrlFetchApp.fetch(url, option);
}

function getSlackReactions(token, link){

  const {channel, timestamp} = getContentsFromSlackLink(link);

  const url = 'https://slack.com/api/reactions.get'
    + '?token=' + token
    + '&channel=' + channel
    + '&timestamp=' + timestamp
    + '&full=true'
  ;
  
  let res = UrlFetchApp.fetch(url, {muteHttpExceptions:true});
  return JSON.parse(res);
}

function getContentsFromSlackLink(link){
  link = link.replace(/https(.*?)archives\//, '');
  Logger.log(link);
  link = link.split('/');
  const channel = link[0];
  let timestamp = link[1].replace('p', '');
  const timestamp1 = timestamp.substr(0, 10);
  const timestamp2 = timestamp.substr(10);
  timestamp = timestamp1 + '.' + timestamp2;
  return {channel, timestamp};
}

function findGetMention(name, memberList){
  const person = memberList.find(member => member.name === name);
  if(person === undefined) return '';
  
  return '<@' + person.slackId + '>';
}

function createChannel(token, channelName){

  const url = 'https://slack.com/api/conversations.create?token='
    + token
    + '&name='
    + channelName
    + '&is_private=true';
  
  return JSON.parse(UrlFetchApp.fetch(url));
}

 function inviteMember(token, channnelId, slackIdList){

  const url = 'https://slack.com/api/conversations.invite?token=' 
    + token
    + '&channel=' 
    + channnelId
    + '&users=' 
    + slackIdList.join(',');

  return UrlFetchApp.fetch(url);
}

import PubNub from 'pubnub';

const PUBNUB_PUBLISH_KEY = 'pub-c-cf0b55ea-29d2-4169-96ec-90dbc6245c27';
const PUBNUB_SUBSCRIBE_KEY = 'sub-c-249e82b7-53f8-4399-b070-8fbea7f745c2';

export const pubnub = new PubNub({
  publishKey: PUBNUB_PUBLISH_KEY,
  subscribeKey: PUBNUB_SUBSCRIBE_KEY,
  uuid: PubNub.generateUUID(),
});


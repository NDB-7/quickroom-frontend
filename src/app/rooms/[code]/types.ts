export type MessageType =
  | {
      sentByMe: true;
      sender?: undefined;
      content: string;
    }
  | {
      sentByMe: false;
      sender: string;
      content: string;
    };

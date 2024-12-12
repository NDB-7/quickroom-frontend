export type ClientMessageType =
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

export type ChatroomInfoType =
  | {
      success: true;
      name: string;
      expiresAt: number;
    }
  | {
      success: false;
    };

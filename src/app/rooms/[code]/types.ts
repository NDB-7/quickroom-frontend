export type ClientMessageType =
  | {
      sentByMe: true;
      sender?: undefined;
      content: string;
      serverNotification?: undefined;
    }
  | {
      sentByMe: false;
      sender: string;
      content: string;
      serverNotification: false;
    }
  | {
      sentByMe?: undefined;
      sender?: undefined;
      content: string;
      serverNotification: true;
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

export type RejoinResponse =
  | {
      success: true;
      name: string;
    }
  | {
      success: false;
      message?: string;
    };

export type SetNameResponse =
  | {
      success: true;
      sessionId: string;
    }
  | {
      success: false;
      message: string;
    };

export type ClientMessageType =
  | {
      sentByMe: true;
      sender?: undefined;
      content: string;
      serverNotification?: undefined;
      sentAt: number;
    }
  | {
      sentByMe: false;
      sender: string;
      content: string;
      serverNotification: false;
      sentAt: number;
    }
  | {
      sentByMe?: undefined;
      sender?: undefined;
      content: string;
      serverNotification: true;
      sentAt?: undefined;
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
      expired: boolean;
      message?: string;
    };

export type SetNameResponse =
  | {
      success: true;
      session: { room: string; id: string };
    }
  | {
      success: false;
      message: string;
    };

export type SessionType = {
  room: string;
  id: string;
};

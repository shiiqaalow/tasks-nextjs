export const getString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export type ServerResponseStatus = {
  success: boolean;
  status: number;
  message: string;
  userId?: string;
};

export type ServerResponseData<T = unknown> = ServerResponseStatus & {
  data?: T;
};

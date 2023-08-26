type Message = { message: string };

type ServiceWrong = {
  error: string;
  status: number;
  data: Message;
};

type ServiceOk<T> = {
  error: null;
  status: number;
  data: T;
};

type ServiceData<T> = ServiceOk<T> | ServiceWrong;

export default ServiceData;

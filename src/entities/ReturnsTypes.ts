import httpStatus from 'http-status';

export const TASK_UNAUTHORIZED = {
  error: 'TASK_UNAUTHORIZED',
  status: httpStatus.UNAUTHORIZED,
  data: { message: 'You are not allowed to update this task' },
};

export const TASK_NOT_FOUND = {
  error: 'TASK_NOT_FOUND',
  status: httpStatus.NOT_FOUND,
  data: { message: 'Task not found' },
};

export const USER_UNAUTHORIZED = {
  error: 'USER_UNAUTHORIZED',
  status: httpStatus.UNAUTHORIZED,
  data: {
    message:
      'Yours credentials are not valid. Verify your email, role and password, and try again',
  },
};

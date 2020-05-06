import dayjs from 'dayjs';

export const formatDate = (date, format = 'D MMM, YYYY') =>{
    return dayjs(date).format(format);
};

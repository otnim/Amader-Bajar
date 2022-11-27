import _ from 'lodash';

export function paginate(items, pageNumber, pageCapacity) {
    
    const startIndex = (pageNumber - 1) * pageCapacity;

    return _(items).slice(startIndex).take(pageCapacity).value();
}
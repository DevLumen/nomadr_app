import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/LOAD_ALL';

const loadAllBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
};

export const getAllBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings');
    if (response.ok) {
        const bookings = await response.json();
        console.log("FRONTEND", bookings)
        dispatch(loadAllBookings(bookings));
    }
};

const initialState = {

};

const bookingsReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
        case LOAD_BOOKINGS: {
            
            newState = {...state}
            action.bookings.forEach(booking => {
                newState[booking.id] = booking;
                console.log(booking);
            });
            
            return newState;
        }
        default:
            return state;
    }
};

export default bookingsReducer;

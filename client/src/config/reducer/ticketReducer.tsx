import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export type TicketType = {
    movie?: string,
    schedule?: string,
    theater?: string,
    showtime?: string
    seat?: any[],
    price?: number,
    total?: number,
}

const ticketInit: TicketType = {
    movie: '',
    schedule: '',
    theater: '',
    showtime: '',
    seat: [],
    price: 0,
    total: 0,
};

export const ticketAction = createAction<TicketType>("ticket");
export const setSeatAction = createAction<TicketType>("ticket/setSeat");
export const removeSeatAction = createAction<TicketType>("ticket/removeSeat");

const ticketReducer = createReducer(ticketInit, (builder) => {
    builder.addCase(ticketAction, (state: TicketType, { payload }: { payload: TicketType }) => {
        state.movie = payload.movie ? payload.movie : state.movie;
        state.schedule = payload.schedule ? payload.schedule : state.schedule;
        state.theater = payload.theater ? payload.theater : state.theater;
        state.showtime = payload.showtime ? payload.showtime : state.showtime;
        state.price = payload.price ? payload.price : state.price;
        return state;
    });

    builder.addCase(setSeatAction, (state: TicketType, { payload }: { payload: TicketType }) => {
        let seatArray = payload.seat ?? [];
        let totalNumber = payload.total ?? 0;

        state.seat = [...state.seat ?? [], ...seatArray];
        state.price = payload.price;
        state.total = (state.total ?? 0) + totalNumber;
        return state;
    });

    builder.addCase(removeSeatAction, (state: TicketType, { payload }: { payload: TicketType }) => {
        let seatArray = payload.seat ?? [];
        let totalNumber = payload.total ?? 0;
        let stateNumber = state.total ?? 0;

        state.seat = state.seat?.filter((item) => {
            return item.ma_ghe !== seatArray[0].ma_ghe;
        })
        state.total = stateNumber > 0 ? stateNumber - totalNumber : 0;
        return state;
    });

});

export default ticketReducer;

//  Kiểu dữ liệu reducer
export type TicketReducerType = typeof ticketReducer;

// Kiểu dữ liệu state từ reducer
export type TicketStateType = ReturnType<TicketReducerType>

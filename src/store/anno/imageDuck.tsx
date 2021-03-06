import { Reducer } from "redux";
import { ajaxBase, encodeQueryData, GET } from "../../common/ajax";
import { API_LABEL_GET } from "../../common/urls";
import { LabelType } from "../../typings";
import { AppDispatch, GetState } from "../store";

// action type
export const IMAGE_AUTO_NEXT = 'image/autonext' as const;
export const IMAGE_LABEL_GET = 'image/label/get' as const;
export const IMAGE_LABEL_CLEAR = 'image/label/clear' as const;

// action
export const get_image_label = (filename: string) => (dispatch: AppDispatch, getState: GetState) => {
    const { dir } = getState();
    if (dir.cur_dir !== undefined) {
        ajaxBase(API_LABEL_GET + '?' + encodeQueryData({
            path: dir.cur_dir,
            name: filename
        }), GET).then(
            (response) => {
                let label = response.data;
                if (label['데이터셋 정보'])
                    delete label['데이터셋 정보']['데이터셋 상세설명']['폴리곤좌표'];
                dispatch(_get_image_label(response.data))
            }
        ).catch(
            (error) => {
                dispatch(image_label_clear())
            }
        )
    }
}

export const _get_image_label = (data: object) => ({
    type: IMAGE_LABEL_GET,
    payload: data
})

export const image_label_clear = () => ({
    type: IMAGE_LABEL_CLEAR
})

export const image_auto_next = (value: number) => ({
    type: IMAGE_AUTO_NEXT,
    payload: value
})

type ImageSate = {
    label?: LabelType   // external data. type unknown
    auto_next?: number
}

type ImageAction = ReturnType<typeof _get_image_label>
    | ReturnType<typeof image_label_clear>
    | ReturnType<typeof image_auto_next>

// reducer
const INITIAL_STATE = {}

const reducer: Reducer<ImageSate, ImageAction> = (state: ImageSate = INITIAL_STATE, action: ImageAction) => {
    switch (action.type) {
        case IMAGE_LABEL_GET:
            return {
                ...state,
                label: action.payload
            } as ImageSate
        case IMAGE_LABEL_CLEAR:
            return {
                ...state,
                label: {}
            } as ImageSate
        case IMAGE_AUTO_NEXT:
            return {
                ...state,
                auto_next: action.payload
            } as ImageSate
        default:
            return state;
    }
}

export default reducer;
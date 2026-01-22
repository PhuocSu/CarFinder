import { Vehicle } from "@/app/api/listPage/useVehiclesQuery";

export const getVehicleFullName = (car: Vehicle) =>
    `${car.subModel.model.modelName} ${car.subModel.subModelName} ${car.brandName}`;
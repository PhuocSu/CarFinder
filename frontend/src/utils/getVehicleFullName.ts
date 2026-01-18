import { Vehicle } from "@/app/api/listPage/useVehicles";

export const getVehicleFullName = (car: Vehicle) =>
    `${car.subModel.model.modelName} ${car.subModel.subModelName} ${car.brandName}`;
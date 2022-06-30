import NotificationError from "../../@shared/notification/notification.error";
import Entity from "../../entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    this.throwNotificationErrorIfHasErrors();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
    this.throwNotificationErrorIfHasErrors();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
    this.throwNotificationErrorIfHasErrors();
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
  }

  throwNotificationErrorIfHasErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

}

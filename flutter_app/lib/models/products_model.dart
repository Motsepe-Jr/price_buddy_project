import 'package:flutter/material.dart';

import 'category_model.dart';



class ProductModel with ChangeNotifier{
  String? sId;
  String? name;
  String? price;
  int? ratings;
  List<Images?>? images;
  String? category;
  String? store;
  int? stock;
  int? numofReviews;
  String? user;
  String? createdAt;
  int? iV;
  List<StoreInfo?>? storeInfo;


  ProductModel(
      {this.sId,
      this.name,
      this.price,
      this.ratings,
      this.images,
      this.category,
      this.store,
      this.stock,
      this.numofReviews,
      this.user,
      this.createdAt,
      this.iV,
      this.storeInfo});

  ProductModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    price = json['price'];
    ratings = json['ratings'];
    if (json['images'] != null) {
      images = <Images>[];
      json['images'].forEach((v) {
        images!.add(Images.fromJson(v));
      });
    }
    category = json['category'];
    store = json['store'];
    stock = json['stock'];
    numofReviews = json['numofReviews'];
    user = json['user'];
    createdAt = json['createdAt'];
    iV = json['__v'];
    if (json['storeInfo'] != null) {
      storeInfo = <StoreInfo>[];
      json['storeInfo'].forEach((v) {
        storeInfo!.add(StoreInfo.fromJson(v));
      });
    }
  }

  // we need to convert the json to product mode list
  static List<ProductModel> productFromSnapshot(List productFromSnapshot) {

    return productFromSnapshot.map((data) {
      return ProductModel.fromJson(data);
    }
    ).toList();

  }

}

class Images {
  String? publicId;
  String? url;
  String? sId;

  Images({this.publicId, this.url, this.sId});

  Images.fromJson(Map<String, dynamic> json) {
    publicId = json['public_id'];
    url = json['url'];
    sId = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['public_id'] = this.publicId;
    data['url'] = this.url;
    data['_id'] = this.sId;
    return data;
  }
}


class StoreInfo {
  String? sId;
  String? name;
  List<Images?>? logo;
  String? createdAt;
  int? iV;

  StoreInfo({this.sId, this.name, this.logo, this.createdAt, this.iV});

  StoreInfo.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    if (json['logo'] != null) {
      logo = <Images>[];
      json['logo'].forEach((v) {
        logo!.add(Images.fromJson(v));
      });
    }
    createdAt = json['createdAt'];
    iV = json['__v'];
  }

}
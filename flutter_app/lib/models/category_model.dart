import 'package:flutter/material.dart';

class CategoriesModel with ChangeNotifier {
  String? sId;
  String? name;
  List<Images?>? images;
  String? createdAt;
  int? iV;

  CategoriesModel({this.sId, this.name, this.images, this.createdAt, this.iV});

  CategoriesModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    if (json['images'] != null) {
      images = <Images>[];
      json['images'].forEach((v) {
        images!.add(Images.fromJson(v));
      });
    }
    createdAt = json['createdAt'];
    iV = json['__v'];
  }

    // we need to convert the json to product mode list
  static List<CategoriesModel> categoriesFromSnapshot(List categoriesFromSnapshot) {

    return categoriesFromSnapshot.map((data) {
      return CategoriesModel.fromJson(data);
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

  
}



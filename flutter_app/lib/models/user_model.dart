import 'package:flutter/material.dart';

class UserModel with ChangeNotifier {
  Avatar? avatar;
  String? sId;
  String? name;
  String? email;
  String? role;
  String? createdAt;
  int? iV;

  UserModel(
      {this.avatar,
      this.sId,
      this.name,
      this.email,
      this.role,
      this.createdAt,
      this.iV});

  UserModel.fromJson(Map<String, dynamic> json) {
    avatar =
        json['avatar'] != null ? new Avatar.fromJson(json['avatar']) : null;
    sId = json['_id'];
    name = json['name'];
    email = json['email'];
    role = json['role'];
    createdAt = json['createdAt'];
    iV = json['__v'];

    

  }

   // we need to convert the json to product mode list
  static List<UserModel> usersFromSnapshot(List usersFromSnapshot) {

    return usersFromSnapshot.map((data) {
      return UserModel.fromJson(data);
    }
    ).toList();
  }

 
}

class Avatar {
  String? publicId;
  String? url;

  Avatar({this.publicId, this.url});

  Avatar.fromJson(Map<String, dynamic> json) {
    publicId = json['public_id'];
    url = json['url'];
  }

}
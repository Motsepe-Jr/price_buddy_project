class UserRegistration {
  bool? success;
  User? user;
  String? token;

  UserRegistration({this.success, this.user, this.token});

  UserRegistration.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    user = json['user'] != null ? new User.fromJson(json['user']) : null;
    token = json['token'];
  }

  static List<UserRegistration> registrationFromSnapshot(List regitrationFromSnapshot) {

    return regitrationFromSnapshot.map((data) {
      return UserRegistration.fromJson(data);
    }
    ).toList();

  }

}

class User {
  String? name;
  String? email;
  String? password;
  Avatar? avatar;
  String? role;
  String? sId;
  String? createdAt;
  int? iV;

  User(
      {required this.name,
      this.email,
      this.password,
      this.avatar,
      this.role,
      this.sId,
      this.createdAt,
      required this.iV});

  User.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    email = json['email'];
    password = json['password'];
    avatar =
        json['avatar'] != null ? new Avatar.fromJson(json['avatar']) : null;
    role = json['role'];
    sId = json['_id'];
    createdAt = json['createdAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['email'] = this.email;
    data['password'] = this.password;
    data['role'] = this.role;
    data['_id'] = this.sId;
    data['createdAt'] = this.createdAt;
    data['__v'] = this.iV;
    return data;
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
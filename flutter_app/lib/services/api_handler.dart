import "dart:async";
import "dart:convert";
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import "package:http/http.dart" as http;
import "package:price_comparison_sa/consts/api_consts.dart";
import "package:price_comparison_sa/models/category_model.dart";
import "package:price_comparison_sa/models/products_model.dart";
import "package:price_comparison_sa/models/registration_model.dart";
import "package:price_comparison_sa/models/user_model.dart";

class APIHandler {
  static Future<List<ProductModel>> getAllProducts(
      {required String pageNum}) async {
    try {
      var uri = Uri.http(
          BASE_URL, '/api/v1/products', {"page": pageNum} // query params
          );

        
      var response = await http.get(uri
          // ,headers: {"Content-Type": "application/json",  'Accept': 'application/json',
          //   'Authorization': 'Bearer token',}
          );

      if (response.statusCode != 200) {
        throw response.body;
      }

      var data = jsonDecode(response.body);

      return ProductModel.productFromSnapshot(data);
    } catch (error) {
      throw error.toString();
    }
  }

  static Future<List<CategoriesModel>> getAllPCategories({required String pageNum}) async {
   
    const storage = FlutterSecureStorage();
    try {

      var uri = Uri.http(
        BASE_URL,
        '/api/v1/categories',
        {"page": pageNum} 
      );

      String? jwtToken = await storage.read(key: 'jwt_token');

      // link to the path
      var response = await http.get(uri,
           headers: {'Cookie': 'token=$jwtToken'}
          );

      // TODO: validate the status code matches

      if (response.statusCode != 200) {
        throw response.body;
      }

      var data = jsonDecode(response.body);

      return CategoriesModel.categoriesFromSnapshot(data);
    } catch (error) {
      throw error.toString();
    }
  }

  // users
  static Future<List<UserModel>> getUsersInfo() async {
    const storage = FlutterSecureStorage();
    try {
      var uri = Uri.http(
        BASE_URL,
        '/api/v1/me',
      );

      String? jwtToken = await storage.read(key: 'jwt_token');


      // link to the path
      var response =
          await http.get(uri, headers: {'Cookie': 'token=$jwtToken'});

      // TODO: validate the status code matches

      if (response.statusCode != 200) {
        throw response.body;
      }

      var data = jsonDecode(response.body);

      return UserModel.usersFromSnapshot(data);
    } catch (error) {
      throw error.toString();
    }
  }

  // get single product
  static Future<ProductModel> getSingleProduct({required String id}) async {
    try {
      var uri = Uri.http(
        BASE_URL,
        '/api/v1/product/$id',
      );

      var response = await http.get(uri
          // ,headers: {"Content-Type": "application/json",  'Accept': 'application/json',
          //   'Authorization': 'Bearer token',}
          );

      // TODO: validate the status code matches

      if (response.statusCode != 200) {
        throw jsonDecode(response.body)['message'];
      }

      var data = jsonDecode(response.body);

      return ProductModel.fromJson(data);
    } catch (error) {
      throw error.toString();
    }
  }

  // login and Resgiter user api call

  static Future<UserRegistration> registerUser({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      var uri = Uri.http(BASE_URL, '/api/v1/register');

      var headers = {
        'Content-Type': 'application/json',
      };

      var body = jsonEncode({
        'name': name,
        'email': email,
        'password': password,
      });

      var response = await http.post(uri, body: body, headers: headers);

      if (response.statusCode != 200) {
        throw jsonDecode(response.body)['errMessage'];
      }

      var data = jsonDecode(response.body);

      return UserRegistration.fromJson(data);
    } catch (error) {
      throw error.toString();
    }
  }

  static Future<UserRegistration> loginUser({
    required String email,
    required String password,
  }) async {
    try {
      var uri = Uri.http(BASE_URL, '/api/v1/login');

      var headers = {
        'Content-Type': 'application/json',
      };

      var body = jsonEncode({
        'email': email,
        'password': password,
      });

      var response = await http.post(uri, body: body, headers: headers);

      if (response.statusCode != 201) {
        throw jsonDecode(response.body)['errMessage'];
      }

      var data = jsonDecode(response.body);

      return UserRegistration.fromJson(data);
    } catch (error) {
      throw error.toString();
    }
  }
}

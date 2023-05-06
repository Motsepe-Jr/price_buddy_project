import 'package:flutter/material.dart';
import 'package:price_comparison_sa/models/user_model.dart';
import 'package:price_comparison_sa/services/api_handler.dart';
import 'package:price_comparison_sa/widgets/users_widget.dart';
import 'package:provider/provider.dart';


class UserScreen extends StatelessWidget {
  const UserScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("User Profile")),

      body:    FutureBuilder<List<UserModel>>(future: APIHandler.getUsersInfo(), builder: (context, snapshot) {
                      if(snapshot.connectionState == ConnectionState.waiting) {
                        return const Center(child: CircularProgressIndicator(),);
                      }

                      else if(snapshot.hasError) {
                         Center(
                          child: Text('An error occured ${snapshot.error}'),
                        );
                      }

                      else if(snapshot.data == null) {
                         const Center(
                          child: Text('No categories have been added yet'),
                        );
                      }

                      return ChangeNotifierProvider.value(
                        value: snapshot.data![0],
                        child: const UsersWidget()
                        );
      }
    )
    );
  }
}
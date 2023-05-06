// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/user_model.dart';
import 'package:price_comparison_sa/screens/login_screen.dart';
import 'package:provider/provider.dart';



class UsersWidget extends StatelessWidget {
  const UsersWidget({super.key});
 
  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
     final UserModel userModel = Provider.of<UserModel>(context);
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: size.width * 0.15,
                backgroundImage:  NetworkImage(
                  userModel.avatar!.url.toString(),
                ),
              ),
              Positioned(
                right: 0,
                bottom: 0,
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16.0),
                  ),
                  child: const Icon(Icons.camera_alt),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16.0),
           Text(
            userModel.name.toString(),
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 24.0,
            ),
          ),
          const SizedBox(height: 8.0),
           Text(
            userModel.email.toString(),
            style: const TextStyle(
              color: Colors.grey,
              fontSize: 16.0,
            ),
          ),
          const SizedBox(height: 8.0),
           Text(
             userModel.role.toString(),
            style: const TextStyle(
              color: Colors.grey,
              fontWeight: FontWeight.bold,
              fontSize: 16.0,
            ),
          ),
          const SizedBox(height: 16.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
               Icon(Icons.edit),
               SizedBox(width: 8.0),
               Text(
                'Edit Profile',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16.0),
          ElevatedButton.icon(
            onPressed: () {
               Navigator.push(context, 
                        PageTransition(child:  const LoginScreen(), type: PageTransitionType.fade)
                        );
            },
            icon: const Icon(Icons.logout),
            label: const Text('Logout'),
            style: ElevatedButton.styleFrom(
              primary: lightIconsColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16.0),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
import "package:flutter/material.dart";
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:page_transition/page_transition.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/registration_model.dart';
import 'package:price_comparison_sa/screens/home_screen.dart';
import 'package:price_comparison_sa/screens/signup_screen.dart';
import 'package:price_comparison_sa/services/api_handler.dart';
import 'package:price_comparison_sa/widgets/text_field_widget.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
   final storage = new FlutterSecureStorage();

  @override
  void dispose() {
    super.dispose();
    _emailController.dispose();
    _passwordController.dispose();    
  }

  bool _isNotValidated = false;
  bool isError = false;
  String errorString = "";
  static var success;

  UserRegistration? registrationModel;

  Future<void> loginUser() async {
    try {
      if (_emailController.text.isNotEmpty &&
          _passwordController.text.isNotEmpty) {
        
        registrationModel = await APIHandler.loginUser(
            email: _emailController.text,
            password: _passwordController.text);

        await storage.write(key: 'jwt_token', value: registrationModel?.token);
       
        setState(() {
          success = registrationModel!.success!;
        });

      } else {
        setState(() {
          _isNotValidated = true;
        });
      }
    } catch (error) {
      errorString = error.toString().contains('duplicate') ? 'Email Already Exists': error.toString();
      isError = true;
    }

    setState(() {});
  }



  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          width: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Flexible(flex: 2,child: Container(),),
              // svg image
              // ignore: deprecated_member_use
            const Text('PriceBuddy.', style: TextStyle(color: lightIconsColor, fontSize: 40, fontWeight: FontWeight.bold) ,),
              
               const SizedBox(
                height: 40,
              ),
              
              
              // email
              TextFieldInput(textEditingController: _emailController, 
              hintText: 'Enter you email', textInputType: TextInputType.emailAddress, isPass: false,),
              
              const SizedBox(
                height: 24,
              ),
              
              // password
              TextFieldInput(textEditingController: _passwordController, 
              hintText: 'Enter you password', textInputType: TextInputType.visiblePassword, isPass: true,),
              
              const SizedBox(
                height: 24,
              ),
              
              // button
            InkWell(
              onTap: () async {
                await loginUser();
                if (success) {
                  // ignore: use_build_context_synchronously
                  Navigator.push(
                      context,
                      PageTransition(
                          child: const HomeScreen(),
                          type: PageTransitionType.fade));
                } else {
                  setState(() {
                    success = false;
                  });
                }
              },
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: const ShapeDecoration(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(4)),
                  ),
                  color: lightCardColor,
                ),
                child: const Text('Login'),
              ),
            ),

            const SizedBox(
              height: 12,
            ),

            if (_isNotValidated)
              const Center(
                child: Text('Please fill all field input'),
              ),

            if (isError || success == false)
              Center(
                child: Text(
                    'An error has occurred $errorString please try to sign up again'),
              ),
              

              Flexible(flex: 2,child: Container(),),


              Row(
                mainAxisAlignment: MainAxisAlignment.center, 
                children:  [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      vertical: 8
                    ),
                    child: const Text('Dont have an account? '),
                  ), 
                  GestureDetector(
                    onTap: () {

                        Navigator.push(context, 
                        PageTransition(child:  const SignUpScreen(), type: PageTransitionType.fade)
                        );

                    },
                    child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      color: lightCardColor
                    ),
                  child: const Padding(
                    padding: EdgeInsets.only(left:4.0, right:4.0),
                    child: Text(
                      'Sign Up',
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  ),
                  )
                ]
              ), const SizedBox(
              height: 20,
            ),
              // transition to signing up
            ],
          ),
        ),

      )
    );

  }
}
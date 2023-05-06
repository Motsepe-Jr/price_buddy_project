import 'package:flutter/material.dart';

class SaleWidget extends StatelessWidget {
  const SaleWidget({Key? key}) : super(key: key);

  // TODO: Use the special API to get the special of the stores : 

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
  width: double.infinity,
  height: size.height * 0.2,
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(18),
    gradient: const LinearGradient(
        colors: [
          Color(0xff7A60A5),
          Color(0xffF8B195)
        ],
        begin: FractionalOffset(0.0, 0.0),
        end: FractionalOffset(1.0, 0.0),
        stops: [0.0, 1.0],
        tileMode: TileMode.clamp),
  ),
  child: Row(
    children: [
      Flexible(
        flex: 2,
        child: Padding(
          padding: const EdgeInsets.all(14.0),
          child: Container(
            height: double.infinity,
            decoration: BoxDecoration(
              color: const Color(0xff9C4668),
              borderRadius: BorderRadius.circular(18),
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                // mainAxisSize: MainAxisSize.max,
                // mainAxisAlignment: MainAxisAlignment.center,
                // crossAxisAlignment: CrossAxisAlignment.center,
                children: const [
                  Text(
                    "Get the special discount",
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(
                    height: 18,
                  ),
                  Flexible(
                    child: SizedBox(
                      width: double.infinity,
                      child: FittedBox(
                        fit: BoxFit.fill,
                        child: Text(
                          "50 %\nOFF",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            // fontSize: 300,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
     Flexible(
          flex: 3,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Image.network(
                  "https://www.shoprite.co.za/medias/10632961EA-checkers515Wx515H.webp?context=bWFzdGVyfGltYWdlc3wyOTM1NHxpbWFnZS93ZWJwfGltYWdlcy9oMGEvaDJjLzk5Mjk2MDU2NzcwODYud2VicHwwNmMyYzdlMTU5NGIzNmY2MzgwZTg0MjJmYTNjZTY1MDM0YWY4NDIyYmRlODAzMDg3YTgyMjAyMDU5ZDI2Nzg0",
                  fit: BoxFit.contain,
                ),

                Align(
                  alignment: Alignment.topLeft,
                  child: ClipRRect(
                    child: Image.network(
                      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/euekjcgbe0dvisaiaave",
                      width: 40,
                      height:70,
                    
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    ),
  );
}
}
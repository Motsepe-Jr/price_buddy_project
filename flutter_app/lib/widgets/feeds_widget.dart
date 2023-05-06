import 'package:fancy_shimmer_image/fancy_shimmer_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:page_transition/page_transition.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/products_model.dart';
import 'package:price_comparison_sa/screens/product_detail.dart';
import 'package:provider/provider.dart';

class FeedsWidget extends StatelessWidget {
  const FeedsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final ProductModel productsModelProvider =
        Provider.of<ProductModel>(context);
    Size size = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.all(2.0),
      child: Material(
        borderRadius: BorderRadius.circular(8.0),
        color: Theme.of(context).cardColor,
        child: InkWell(
          borderRadius: BorderRadius.circular(8.0),
          onTap: () {
            Navigator.push(
                context,
                PageTransition(
                    child: ProductDetails(
                      id: productsModelProvider.sId.toString(),
                    ),
                    type: PageTransitionType.fade));
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(left: 5, right: 5, top: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      child: RichText(
                          text: TextSpan(
                              text: '',
                              style: const TextStyle(
                                  color: Color.fromRGBO(33, 150, 243, 1)),
                              children: <TextSpan>[
                            TextSpan(
                                text: productsModelProvider.price.toString(),
                                style: const TextStyle(
                                    color: lightTextColor,
                                    fontWeight: FontWeight.w600))
                          ])),
                    ),
                    const Icon(IconlyBold.heart),
                  ],
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  color: lightBackgroundColor,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: FancyShimmerImage(
                      height: size.height * 0.2,
                      width: double.infinity,
                      errorWidget: const Icon(IconlyBold.danger,
                          color: Colors.red, size: 28),
                      imageUrl: productsModelProvider.images![0]!.url!,
                      boxFit: BoxFit.fill,
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 8,
              ),

               Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Flexible(
                    child: Padding(
                      padding: const EdgeInsets.all(5.0),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(50.0),
                        child: Image.network(
                          width: 40,
                          height:40,
                          productsModelProvider.storeInfo![0]!.logo![0]!.url!,
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(right: 2),
                      child: Text(
                        productsModelProvider.name.toString().toLowerCase(),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                        style: const TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w500),
                      ),
                    ),
                  ),
                ],
              ),

            
              SizedBox(
                height: size.height * 0.001,
              )
            ],
          ),
        ),
      ),
    );
  }
}

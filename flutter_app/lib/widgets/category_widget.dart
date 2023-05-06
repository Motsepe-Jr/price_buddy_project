import 'package:fancy_shimmer_image/fancy_shimmer_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:page_transition/page_transition.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/category_model.dart';
import 'package:price_comparison_sa/screens/feeds_screen.dart';
import 'package:price_comparison_sa/widgets/feeds_widget.dart';
import 'package:provider/provider.dart';

class CategoryWidget extends StatelessWidget {
  const CategoryWidget({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final CategoriesModel categoriesModel =
        Provider.of<CategoriesModel>(context);
    return Padding(
  padding: const EdgeInsets.all(13.0),
  child: Container(
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(18),
      color: lightCardColor,
    ),
    child: InkWell(
      borderRadius: BorderRadius.circular(8.0),
          onTap: () {
            Navigator.push(
                context,
                PageTransition (
                    child: const FeedsScreen(
                     // TODO: navigate the user to api/categories?keyowrd=categpry
                    ),
                    type: PageTransitionType.fade));
          },
      child: SizedBox(
        height: size.width * 0.6,
        child: Column(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(top:8.0),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(18),
                  child: FancyShimmerImage(
                    height: size.width * 0.60,
                    width: size.width * 0.60,
                    errorWidget: const Icon(
                      IconlyBold.danger,
                      color: Colors.red,
                      size: 28,
                    ),
                    imageUrl: categoriesModel.images![0]!.url.toString(),
                    boxFit: BoxFit.contain,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              categoriesModel.name.toString(),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
                color: lightIconsColor,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    ),
  ),
);

  }
}

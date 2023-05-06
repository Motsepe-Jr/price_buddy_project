import 'package:card_swiper/card_swiper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:page_transition/page_transition.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/products_model.dart';
import 'package:price_comparison_sa/screens/categories_screen.dart';
import 'package:price_comparison_sa/screens/feeds_screen.dart';
import 'package:price_comparison_sa/screens/users_screen.dart';
import 'package:price_comparison_sa/services/api_handler.dart';
import 'package:price_comparison_sa/widgets/appbar_icons.dart';
import 'package:price_comparison_sa/widgets/feed_grid.dart';
import 'package:price_comparison_sa/widgets/sale_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late TextEditingController _textEditingController;

  @override
  void initState() {
    _textEditingController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus(); // help with focus when you search
      },
      child: Scaffold(
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          titleSpacing: 0,
          title: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: const [
              Padding(
                padding: EdgeInsets.only(left: 16.0),
                child: Text(
                  'PriceBuddy.',
                  style: TextStyle(
                    color: lightIconsColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 20,
                  ),
                ),
              ),
            ],
          ),
          actions: [
            AppBarIcons(
              function: () {
                Navigator.push(
                  context,
                  PageTransition(
                    child: const CategoryScreen(),
                    type: PageTransitionType.fade,
                  ),
                );
              },
              icon: IconlyBold.category,
            ),
            const SizedBox(width: 16),
            AppBarIcons(
               function: () {
                Navigator.push(
                  context,
                  PageTransition(
                    child: const UserScreen(),
                    type: PageTransitionType.fade,
                  ),
                );
              },
              icon: IconlyBold.profile,
            ),
            const SizedBox(width: 16),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              const SizedBox(
                height: 18,
              ),
              TextField(
                controller: _textEditingController,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                    hintText: "Search",
                    filled: true,
                    fillColor: Theme.of(context)
                        .cardColor, // make the background of search to be white
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide:
                            BorderSide(color: Theme.of(context).cardColor)),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide: BorderSide(
                          width: 1,
                          color: Theme.of(context).colorScheme.secondary),
                    ),
                    suffixIcon: const Icon(
                      IconlyLight.search,
                      color: lightIconsColor,
                    )),
              ),
              const SizedBox(
                height: 18,
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      SizedBox(
                        height: MediaQuery.of(context).size.height * 0.25,
                        child: Swiper(
                          itemCount: 3,
                          itemBuilder: (ctx, index) {
                            return const SaleWidget();
                          },
                          autoplay: true,
                          pagination: const SwiperPagination(
                              alignment: Alignment.bottomCenter,
                              builder: DotSwiperPaginationBuilder(
                                  activeColor: Color(0xff9C4668),
                                  color: Colors.white)),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            const Text(
                              "Latest Prices",
                              style: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 16,
                                  color: lightIconsColor),
                            ),
                            const Spacer(),
                            AppBarIcons(
                                function: () {
                                  Navigator.push(
                                      context,
                                      PageTransition(
                                          child: const FeedsScreen(),
                                          type: PageTransitionType.fade));
                                },
                                icon: IconlyBold.arrowRight2),
                          ],
                        ),
                      ),
                      FutureBuilder<List<ProductModel>>(
                          future:
                              APIHandler.getAllProducts(pageNum: 51.toString()),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.waiting) {
                              return const Center(
                                child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(lightIconsColor),
                )
                              );
                            } else if (snapshot.hasError) {
                              Center(
                                child:
                                    Text('An error occured: ${snapshot.error}'),
                              );
                            } else if (!snapshot.hasData) {
                              const Center(
                                child: Text('No products have been added yet'),
                              );
                            }
     
                            return (snapshot.hasData && snapshot.data != null)
                                    ? FeedsGridWidget(productsList: snapshot.data!)
                                    : const Center(child: Text('No products have been added yet', style: TextStyle(fontWeight: FontWeight.w600,),));
                          })
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

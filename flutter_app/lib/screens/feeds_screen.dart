import 'package:flutter/material.dart';
import 'package:flutter_iconly/flutter_iconly.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/products_model.dart';
import 'package:price_comparison_sa/services/api_handler.dart';
import 'package:price_comparison_sa/widgets/appbar_icons.dart';
import 'package:price_comparison_sa/widgets/feeds_widget.dart';
import 'package:provider/provider.dart';

class FeedsScreen extends StatefulWidget {
  const FeedsScreen({Key? key}) : super(key: key);

  @override
  State<FeedsScreen> createState() => _FeedsScreenState();
}

class _FeedsScreenState extends State<FeedsScreen> {
  final ScrollController _scrollController = ScrollController();
  int pageNum = 1;
  bool isLoading = false;


  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() async {
      if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
        if (!isLoading) {
          setState(() {
            isLoading = true;
          });
          await _loadMoreProducts();
          setState(() {
            isLoading = false;
          });
        }
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _loadMoreProducts() async {
    final products = await APIHandler.getAllProducts(pageNum: pageNum.toString());
      setState(() {
        pageNum += 1;
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Product Prices', style: TextStyle(
                    color: lightIconsColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 20,
                  ),),
      ),
      body: FutureBuilder<List<ProductModel>>(
        future: APIHandler.getAllProducts(pageNum: pageNum.toString()),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(lightIconsColor),
                )
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('An error occurred ${snapshot.error}'),
            );
          } else if (snapshot.data == null) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(lightIconsColor),
                )
            );
          }
          return GridView.builder(
            controller: _scrollController,
            itemCount: snapshot.data!.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 0.1,
              mainAxisSpacing: 0.1,
              childAspectRatio: 0.7,
            ),
            itemBuilder: (ctx, index) {
              return ChangeNotifierProvider.value(
                value: snapshot.data![index],
                child: const FeedsWidget(),
              );
            },
          );
        },
      ),
    );
  }
}



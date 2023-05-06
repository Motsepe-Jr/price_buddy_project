import 'package:flutter/material.dart';
import 'package:price_comparison_sa/models/category_model.dart';
import 'package:price_comparison_sa/services/api_handler.dart';
import 'package:price_comparison_sa/widgets/category_widget.dart';
import 'package:provider/provider.dart';

import '../consts/global_colors.dart';

class CategoryScreen extends StatefulWidget {
  const CategoryScreen({super.key});

  @override
  State<CategoryScreen> createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  final ScrollController _scrollController = ScrollController();
  int pageNum = 1;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() async {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        if (!isLoading) {
          setState(() {
            isLoading = true;
          });
          await _loadMoreCategories();
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

  Future<void> _loadMoreCategories() async {
    final categories =
        await APIHandler.getAllPCategories(pageNum: pageNum.toString());
    setState(() {
      pageNum += 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text("Brands",
                style: TextStyle(
                  color: lightIconsColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 20,
                ))),
        body: FutureBuilder<List<CategoriesModel>>(
            future: APIHandler.getAllPCategories(pageNum: pageNum.toString()),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(lightIconsColor),
                  ),
                );
              } else if (snapshot.hasError) {
                Center(
                  child: Text('An error occured ${snapshot.error}'),
                );
              } else if (snapshot.data == null) {
                const Center(
                  child: Text('No categories have been added yet'),
                );
              }

              return GridView.builder(
                  controller: _scrollController,
                  itemCount: snapshot.data!.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 0.1,
                    mainAxisSpacing: 0.1,
                    childAspectRatio: 0.8,
                  ),
                  itemBuilder: (ctx, index) {
                    return ChangeNotifierProvider.value(
                      value: snapshot.data![index],
                      child: const CategoryWidget(),
                    );
                  });
            }));
  }
}

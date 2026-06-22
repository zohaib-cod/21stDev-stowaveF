

import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  // Stowave Clothing Brand k mutabiq Sales aur Order data metrics
  const stats = [
    { id: 1, name: 'Total Revenue', value: '₨ 485,200', icon: DollarSign, change: '+14.8%', changeType: 'positive' },
    { id: 2, name: 'New Orders', value: '142', icon: ShoppingBag, change: '+22 today', changeType: 'positive' },
    { id: 3, name: 'Products in Catalog', value: '84 Items', icon: Package, change: '4 Categories', changeType: 'neutral' },
    { id: 4, name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '-0.4%', changeType: 'negative' },
  ];

  // Stowave Recent Live Clothing Orders List
  const recentOrders = [
    { id: '#STW-9041', customer: 'Hamza Ahmed', items: 'Oversized Tee (M) x2', total: '₨ 4,500', status: 'Pending', statusColor: 'amber' },
    { id: '#STW-9040', customer: 'Ayesha Khan', items: 'Cargo Pants (S) x1, Hoodie (L) x1', total: '₨ 8,200', status: 'Shipped', statusColor: 'blue' },
    { id: '#STW-9039', customer: 'Zainab Fatima', items: 'Drop Shoulder Sweatshirt (S) x1', total: '₨ 3,800', status: 'Delivered', statusColor: 'emerald' },
    { id: '#STW-9038', customer: 'Bilal Siddiqui', items: 'Graphic Tee (XL) x3', total: '₨ 5,900', status: 'Delivered', statusColor: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome Banner for Stowave Clothing Brand */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stowave Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your clothing inventory, track orders, and monitor system diagnostics.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center space-x-2">
            <span>Add New Product</span>
            <span className="text-xs bg-slate-700 px-1.5 py-0.5 rounded">+</span>
          </button>
        </div>
      </div>

      {/* 1. E-Commerce Statistics Grid Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{item.name}</span>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <Icon className="h-5 w-5 text-slate-800" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-slate-900">{item.value}</span>
                <div className="mt-1 flex items-center space-x-1.5">
                  {item.changeType === 'positive' && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />}
                  {item.changeType === 'negative' && <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" />}
                  <span className={`text-xs font-semibold ${
                    item.changeType === 'positive' ? 'text-emerald-600' : 
                    item.changeType === 'negative' ? 'text-rose-600' : 'text-slate-500'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Main Workspace Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Processing Feed Container */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Recent Live Orders</h2>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">Fulfillment Stream</span>
          </div>
          
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Items Ordered</th>
                <th className="pb-3 font-medium">Total Price</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="py-3.5 font-semibold text-slate-900">{order.id}</td>
                  <td className="py-3.5">{order.customer}</td>
                  <td className="py-3.5 max-w-[200px] truncate" title={order.items}>{order.items}</td>
                  <td className="py-3.5 font-medium text-slate-900">{order.total}</td>
                  <td className="py-3.5 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      order.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      order.statusColor === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clothing Stock & Inventory Monitor Utility Component */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Inventory Alerts</h2>
              <p className="text-xs text-slate-400 mt-0.5">Low stock metrics & replenishment requirements</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <span className="text-sm text-slate-700 font-medium">Oversized Tee (Black - S)</span>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Out of stock</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-slate-700 font-medium">Cargo Pants (Olive - M)</span>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">5 Left</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-slate-600">Winter Jackets Framework</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Fully Stocked</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors duration-200">
              <span>View Full Inventory Inventory</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [botStatus, setBotStatus] = useState(true);
  const [keywords, setKeywords] = useState(['спам', 'реклама', 'продам', 'куплю']);
  const [newKeyword, setNewKeyword] = useState('');
  const [notifications, setNotifications] = useState(true);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const stats = {
    messagesProcessed: 1247,
    spamBlocked: 89,
    warningsIssued: 23,
    activeFilters: keywords.length
  };

  return (
    <div className="min-h-screen bg-telegram-white p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-telegram-blue rounded-xl">
              <Icon name="Shield" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-telegram-dark">Антиспам Бот</h1>
          </div>
          <p className="text-telegram-gray text-lg">Панель администрирования для защиты чата</p>
        </div>

        {/* Status Alert */}
        <Alert className={`${botStatus ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <Icon name={botStatus ? "CheckCircle" : "AlertCircle"} className={`w-5 h-5 ${botStatus ? 'text-green-600' : 'text-red-600'}`} />
          <AlertDescription className={`${botStatus ? 'text-green-800' : 'text-red-800'}`}>
            Бот {botStatus ? 'активен и защищает чат' : 'отключен'}
          </AlertDescription>
        </Alert>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-3">
                <Icon name="MessageSquare" className="w-6 h-6 text-telegram-blue" />
              </div>
              <div className="text-2xl font-bold text-telegram-dark">{stats.messagesProcessed}</div>
              <div className="text-sm text-telegram-gray">Сообщений обработано</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-red-100 rounded-xl w-fit mx-auto mb-3">
                <Icon name="Shield" className="w-6 h-6 text-telegram-red" />
              </div>
              <div className="text-2xl font-bold text-telegram-dark">{stats.spamBlocked}</div>
              <div className="text-sm text-telegram-gray">Спам заблокировано</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-yellow-100 rounded-xl w-fit mx-auto mb-3">
                <Icon name="AlertTriangle" className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-telegram-dark">{stats.warningsIssued}</div>
              <div className="text-sm text-telegram-gray">Предупреждений выдано</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-xl w-fit mx-auto mb-3">
                <Icon name="Filter" className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-telegram-dark">{stats.activeFilters}</div>
              <div className="text-sm text-telegram-gray">Активных фильтров</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bot Controls */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-telegram-dark">
                <Icon name="Settings" className="w-5 h-5" />
                Управление ботом
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-telegram-dark">Статус бота</div>
                  <div className="text-sm text-telegram-gray">
                    {botStatus ? 'Бот активно модерирует чат' : 'Модерация отключена'}
                  </div>
                </div>
                <Switch 
                  checked={botStatus} 
                  onCheckedChange={setBotStatus}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-telegram-dark">Уведомления</div>
                  <div className="text-sm text-telegram-gray">Получать алерты о спаме</div>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Keyword Filter */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-telegram-dark">
                <Icon name="Filter" className="w-5 h-5" />
                Фильтр ключевых слов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Добавить слово для блокировки"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button 
                  onClick={addKeyword}
                  className="bg-telegram-blue hover:bg-telegram-blue/90 text-white"
                >
                  <Icon name="Plus" className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-gray-100 text-telegram-dark hover:bg-gray-200"
                  >
                    {keyword}
                    <Icon 
                      name="X" 
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-telegram-red" 
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-telegram-dark">
              <Icon name="Activity" className="w-5 h-5" />
              Последняя активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '14:23', action: 'Заблокировано сообщение', user: '@spammer123', reason: 'Ключевое слово: "продам"' },
                { time: '13:45', action: 'Предупреждение выдано', user: '@user456', reason: 'Подозрительная ссылка' },
                { time: '12:30', action: 'Сообщение удалено', user: '@advertiser', reason: 'Ключевое слово: "реклама"' },
                { time: '11:15', action: 'Заблокировано сообщение', user: '@bot_spam', reason: 'Множественные ключевые слова' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-telegram-gray font-mono">{activity.time}</div>
                    <div>
                      <div className="font-medium text-telegram-dark">{activity.action}</div>
                      <div className="text-sm text-telegram-gray">
                        Пользователь: {activity.user} • {activity.reason}
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={index === 0 ? 'border-telegram-red text-telegram-red' : 'border-yellow-500 text-yellow-600'}
                  >
                    {index === 0 ? 'Блок' : 'Предупреждение'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-telegram-dark">
              <Icon name="Users" className="w-5 h-5" />
              Действия администратора
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col gap-2 border-telegram-blue text-telegram-blue hover:bg-telegram-blue hover:text-white"
              >
                <Icon name="UserX" className="w-6 h-6" />
                <span>Заблокировать пользователя</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
              >
                <Icon name="AlertTriangle" className="w-6 h-6" />
                <span>Выдать предупреждение</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              >
                <Icon name="Download" className="w-6 h-6" />
                <span>Экспорт логов</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}